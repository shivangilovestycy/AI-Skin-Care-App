import http from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tiers, getCatalogForBudget, catalog as defaultCatalog } from "./api/catalog.js";

const root = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(root, ".env"));

const port = Number(process.env.PORT || 3000);

function loadEnv(envPath) {
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [k, ...v] = trimmed.split("=");
      if (k && v) process.env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // optional .env file
  }
}

function json(res, status, data) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function demoResult(userContext = {}) {
  const budget = userContext.budget || "";
  const tier = getCatalogForBudget(budget);
  const customBudget = budget ? `within your budget preference of ${budget} (${tier.name})` : `tailored to your ${tier.name}`;

  const dayRoutine = tier.daytime.map(p => ({
    stepNumber: p.stepNumber,
    step: p.stepTitle,
    guidance: p.match,
    category: p.category,
    recommendedProduct: p.name,
    price: p.price,
    imageUrl: p.imageUrl
  }));

  const nightRoutine = tier.nighttime.map(p => ({
    stepNumber: p.stepNumber,
    step: p.stepTitle,
    guidance: p.match,
    category: p.category,
    recommendedProduct: p.name,
    price: p.price,
    imageUrl: p.imageUrl
  }));

  return {
    summary: `Your personalized clinical protocol, ${customBudget}. Engineered with distinct daytime barrier shielding and nighttime cellular restoration routines.`,
    visibleObservations: [
      "Skin barrier shows mild daytime trans-epidermal moisture need",
      "Balanced pore clarity suitable for targeted active ingredients"
    ],
    careLevel: "routine",
    caution: "Always patch test new actives on your inner forearm. If stinging, persistent redness, or swelling occurs, discontinue use immediately.",
    dayRoutine,
    nightRoutine,
    selectedTier: tier
  };
}

function sendFile(req, res) {
  const requestPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const clean = path.posix.join("/public", requestPath);
  const file = path.normalize(path.join(root, clean));
  if (!file.startsWith(root) || !file.startsWith(path.join(root, "public"))) return json(res, 403, { error: "Forbidden" });
  stat(file).then(() => {
    const type = file.endsWith(".css") ? "text/css" :
                 file.endsWith(".js") ? "application/javascript" :
                 file.endsWith(".png") ? "image/png" :
                 file.endsWith(".jpg") || file.endsWith(".jpeg") ? "image/jpeg" :
                 file.endsWith(".webp") ? "image/webp" :
                 file.endsWith(".svg") ? "image/svg+xml" : "text/html";
    res.writeHead(200, { "content-type": `${type}; charset=utf-8` });
    createReadStream(file).pipe(res);
  }).catch(() => json(res, 404, { error: "Not found" }));
}

http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if ((req.method === "GET" || req.method === "HEAD") && parsedUrl.pathname === "/api/catalog") {
    const budgetParam = parsedUrl.searchParams.get("budget") || "";
    const selectedTier = getCatalogForBudget(budgetParam);
    return json(res, 200, {
      tiers,
      selectedTier,
      catalog: selectedTier,
      daytime: selectedTier.daytime,
      nighttime: selectedTier.nighttime,
      products: [...selectedTier.daytime, ...selectedTier.nighttime]
    });
  }

  if (req.method === "POST" && parsedUrl.pathname === "/api/analyze") {
    let raw = "";
    req.on("data", (part) => raw += part);
    req.on("end", async () => {
      try {
        const body = JSON.parse(raw || "{}");
        const selectedTier = getCatalogForBudget(body.budget);
        json(res, 200, {
          analysis: demoResult(body),
          catalog: selectedTier,
          products: [...selectedTier.daytime, ...selectedTier.nighttime],
          selectedTier
        });
      } catch (error) {
        const selectedTier = defaultCatalog;
        json(res, 200, {
          analysis: demoResult(),
          catalog: selectedTier,
          products: [...selectedTier.daytime, ...selectedTier.nighttime],
          selectedTier
        });
      }
    });
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") return sendFile(req, res);
  json(res, 405, { error: "Method not allowed" });
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

import http from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tiers, getCatalogForBudget, catalog as defaultCatalog, buildPersonalizedRoutine } from "./api/catalog.js";
import analyzeHandler from "./api/analyze.js";
import catalogHandler from "./api/catalog.js";

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

  if (parsedUrl.pathname === "/api/catalog") {
    return catalogHandler(req, res);
  }

  if (parsedUrl.pathname === "/api/analyze") {
    return analyzeHandler(req, res);
  }

  if (req.method === "GET" || req.method === "HEAD") return sendFile(req, res);
  json(res, 405, { error: "Method not allowed" });
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

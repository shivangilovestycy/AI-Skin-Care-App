import http from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(root, ".env"));

const port = Number(process.env.PORT || 3000);
const catalog = [
  { id: "cleanser-01", category: "Cleanser", name: "CeraVe Hydrating Facial Cleanser", match: "A gentle everyday cleanse", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser", imageUrl: "" },
  { id: "serum-01", category: "Serum", name: "The Ordinary Niacinamide 10% + Zinc 1%", match: "For a simple oil-control routine", retailer: "Official DECIEM", url: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html", imageUrl: "" },
  { id: "moisturiser-01", category: "Moisturiser", name: "CeraVe Moisturising Cream", match: "Barrier-supporting moisture", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream", imageUrl: "" },
  { id: "sunscreen-01", category: "Sunscreen", name: "La Roche-Posay Anthelios UVMune 400", match: "Daily broad-spectrum protection", retailer: "Official La Roche-Posay", url: "https://www.laroche-posay.co.uk/en_GB/anthelios-uvmune-400-invisible-fluid-spf50-plus/3337875797597.html", imageUrl: "" }
];

function loadEnv(file) {
  try {
    const text = requireText(file);
    text.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    });
  } catch { /* .env is optional */ }
}
function requireText(file) { return readFileSync(file, "utf8"); }

function json(res, status, value) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

function sendFile(req, res) {
  const requestPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const clean = path.posix.join("/public", requestPath);
  const file = path.normalize(path.join(root, clean));
  if (!file.startsWith(root) || !file.startsWith(path.join(root, "public"))) return json(res, 403, { error: "Forbidden" });
  stat(file).then(() => {
    const type = file.endsWith(".css") ? "text/css" : file.endsWith(".js") ? "application/javascript" : "text/html";
    res.writeHead(200, { "content-type": `${type}; charset=utf-8` }); createReadStream(file).pipe(res);
  }).catch(() => json(res, 404, { error: "Not found" }));
}

http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/catalog") return json(res, 200, { products: catalog });
  if (req.method === "GET") return sendFile(req, res);
  json(res, 405, { error: "Method not allowed" });
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

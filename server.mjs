import http from "node:http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(root, ".env"));

const port = Number(process.env.PORT || 3000);

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

http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Mira API Server");
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

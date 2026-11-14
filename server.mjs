import http from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(root, ".env"));

const port = Number(process.env.PORT || 3000);
const nimModel = process.env.NVIDIA_NIM_MODEL || "nvidia/nemotron-3.5-super-vl-120b-a12b";
const catalog = [
  { id: "cleanser-01", category: "Cleanser", name: "CeraVe Hydrating Facial Cleanser", match: "A gentle everyday cleanse", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser", imageUrl: "" },
  { id: "serum-01", category: "Serum", name: "The Ordinary Niacinamide 10% + Zinc 1%", match: "For a simple oil-control routine", retailer: "Official DECIEM", url: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html", imageUrl: "" },
  { id: "moisturiser-01", category: "Moisturiser", name: "CeraVe Moisturising Cream", match: "Barrier-supporting moisture", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream", imageUrl: "" },
  { id: "sunscreen-01", category: "Sunscreen", name: "La Roche-Posay Anthelios UVMune 400", match: "Daily broad-spectrum protection", retailer: "Official La Roche-Posay", url: "https://www.laroche-posay.co.uk/en_GB/anthelios-uvmune-400-invisible-fluid-spf50-plus/3337875797597.html", imageUrl: "" }
];

const safetyPrompt = `You are Mira, a cautious skincare-education assistant. You are not a dermatologist and do not diagnose from photos. A selfie is insufficient to determine hormonal acne, allergies, infections, pregnancy status, medication suitability, or a person's age or gender. Use the user's declared age range only. Describe only visible, non-diagnostic observations with uncertainty. Recommend general, low-risk over-the-counter routine categories; never prescribe medication or say a condition is confirmed. Retinoids may irritate and are not appropriate for pregnancy; for persistent, painful, cystic, sudden, spreading, swollen, blistering, eye-area, or severe symptoms, advise in-person dermatology care. Do not encourage perfect/glass skin ideals. Return valid JSON only with this shape: {"summary":"string","visibleObservations":["string"],"careLevel":"routine"|"professional","caution":"string","routine":[{"step":"Morning cleanse"|"Toner (optional)"|"Serum"|"Moisturiser"|"Sunscreen"|"Night routine","guidance":"string"}],"productCategories":["string"],"questions":["string"]}.`;

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
function demoResult() {
  return {
    summary: "This is a demonstration plan. Add your NVIDIA NIM key to analyse a selfie with the configured vision model.",
    visibleObservations: ["No live image analysis is running yet"],
    careLevel: "routine",
    caution: "Stop a product if it stings, burns, or causes swelling. Seek clinician advice for persistent or severe concerns.",
    routine: [
      { step: "Morning cleanse", guidance: "Use a gentle cleanser if your skin feels oily or after exercise" },
      { step: "Toner (optional)", guidance: "Choose a simple hydrating toner; skip it if it causes irritation" },
      { step: "Serum", guidance: "Introduce one active at a time and patch test first" },
      { step: "Moisturiser", guidance: "Use a fragrance-free barrier-supporting moisturiser" },
      { step: "Sunscreen", guidance: "Use broad-spectrum SPF 30+ and reapply as directed" },
      { step: "Night routine", guidance: "Keep the routine simple; add treatment only gradually" }
    ],
    productCategories: ["Cleanser", "Serum", "Moisturiser", "Sunscreen"],
    questions: ["Do you have any known allergies or a current prescription treatment?", "Has this concern been painful, sudden, or persistent?"]
  };
}
async function callNim(payload) {
  if (!process.env.NVIDIA_API_KEY) return demoResult();
  const imagePart = payload.imageData ? [{ type: "image_url", image_url: { url: payload.imageData } }] : [];
  const request = {
    model: nimModel,
    temperature: 0.2,
    top_p: 0.95,
    max_tokens: 1500,
    messages: [
      { role: "system", content: safetyPrompt },
      { role: "user", content: [{ type: "text", text: `Declared age range: ${payload.ageRange || "not provided"}. Goals: ${payload.goals || "not provided"}. Sensitivities: ${payload.sensitivities || "not provided"}. Budget: ${payload.budget || "not provided"}. Analyse the attached face photo cautiously.` }, ...imagePart] }
    ]
  };
  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(request)
  });
  if (!response.ok) throw new Error(`NVIDIA NIM returned ${response.status}`);
  const body = await response.json();
  const text = body.choices?.[0]?.message?.content || "";
  const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, ""));
  return parsed;
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
http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/api/catalog") return json(res, 200, { products: catalog });
  if (req.method === "POST" && req.url === "/api/analyze") {
    let raw = ""; req.on("data", (part) => raw += part); req.on("end", async () => {
      try { json(res, 200, { analysis: await callNim(JSON.parse(raw || "{}")), catalog }); }
      catch (error) { json(res, 502, { error: error.message || "Analysis unavailable" }); }
    }); return;
  }
  if (req.method === "GET") return sendFile(req, res);
  json(res, 405, { error: "Method not allowed" });
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

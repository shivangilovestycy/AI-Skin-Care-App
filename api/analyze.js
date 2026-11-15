import { catalog } from "./catalog.js";

const nimModel = process.env.NVIDIA_NIM_MODEL || "nvidia/nemotron-3.5-super-vl-120b-a12b";
const safetyPrompt = `You are Mira, a cautious skincare-education assistant. You are not a dermatologist and do not diagnose from photos. A selfie is insufficient to determine hormonal acne, allergies, infections, pregnancy status, medication suitability, or a person's age or gender. Use the user's declared age range only. Describe only visible, non-diagnostic observations with uncertainty. Recommend general, low-risk over-the-counter routine categories; never prescribe medication or say a condition is confirmed. Retinoids may irritate and are not appropriate for pregnancy; for persistent, painful, cystic, sudden, spreading, swollen, blistering, eye-area, or severe symptoms, advise in-person dermatology care. Do not encourage perfect/glass skin ideals. Return valid JSON only with this shape: {"summary":"string","visibleObservations":["string"],"careLevel":"routine"|"professional","caution":"string","routine":[{"step":"Morning cleanse"|"Toner (optional)"|"Serum"|"Moisturiser"|"Sunscreen"|"Night routine","guidance":"string"}],"productCategories":["string"],"questions":["string"]}.`;

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

function extractJson(text) {
  if (!text) return demoResult();
  try {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const candidate = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(candidate);
    }
  } catch (err) {
    console.warn("JSON extraction failed, using fallback:", err);
  }
  const fallback = demoResult();
  if (text && text.trim()) fallback.summary = text.trim();
  return fallback;
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
      { role: "user", content: [{ type: "text", text: `Declared age range: ${payload.ageRange || "not provided"}. Goals: ${payload.goals || "not provided"}. Sensitivities: ${payload.sensitivities || "not provided"}. Budget: ${payload.budget || "not provided"}. Analyse the user face image cautiously.` }, ...imagePart] }
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
  return extractJson(text);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { "content-type": "application/json" });
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  let body = req.body;
  if (!body) {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      body = {};
    }
  } else if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  try {
    const analysis = await callNim(body);
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ analysis, catalog }));
  } catch (error) {
    res.writeHead(502, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: error.message || "Analysis unavailable" }));
  }
}

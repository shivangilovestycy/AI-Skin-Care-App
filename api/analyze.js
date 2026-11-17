import { catalog, tiers, getCatalogForBudget } from "./catalog.js";

const nimModel = process.env.NVIDIA_NIM_MODEL || "nvidia/nemotron-3.5-super-vl-120b-a12b";
const safetyPrompt = `You are Mira, an intelligent, cautious clinical skincare-education AI. You are not a dermatologist and do not diagnose medical conditions. A photo is insufficient to diagnose hormonal disorders, infections, or severe skin conditions. Use user-declared age range, goals, budget, and sensitivities.

Provide a dedicated, clinical DAYTIME (AM) routine and NIGHTTIME (PM) routine with specific step numbers, timing guidance, and product advice.
Return STRICT JSON ONLY with this exact structure:
{
  "summary": "Concise summary of skin analysis and routine philosophy (classy, professional, supportive)",
  "visibleObservations": ["Non-diagnostic observation 1", "Non-diagnostic observation 2"],
  "careLevel": "routine" or "professional",
  "caution": "Clinical caution notice regarding active patch-testing, SPF adherence, or when to see an MD",
  "dayRoutine": [
    {
      "stepNumber": "01",
      "step": "Gentle Morning Cleanse",
      "guidance": "Wash with lukewarm water and a non-stripping cleanser to clear overnight sebum.",
      "category": "Cleanser",
      "recommendedProduct": "Product Name"
    }
  ],
  "nightRoutine": [
    {
      "stepNumber": "01",
      "step": "Purifying Evening Cleanse",
      "guidance": "Thoroughly removes pollution, sunscreen, and daily buildup to allow overnight cellular renewal.",
      "category": "Cleanser",
      "recommendedProduct": "Product Name"
    }
  ]
}`;

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
    caution: "Always patch test new actives on your inner forearm. If stinging, persistent redness, or swelling occurs, discontinue use immediately. Consult a licensed dermatologist for chronic conditions.",
    dayRoutine,
    nightRoutine,
    selectedTier: tier
  };
}

function extractJson(text, userContext = {}) {
  if (!text) return demoResult(userContext);
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return demoResult(userContext);
  }
  const clean = text.slice(firstBrace, lastBrace + 1);
  try {
    const parsed = JSON.parse(clean);
    const tier = getCatalogForBudget(userContext.budget);
    return {
      ...parsed,
      dayRoutine: parsed.dayRoutine && parsed.dayRoutine.length ? parsed.dayRoutine : demoResult(userContext).dayRoutine,
      nightRoutine: parsed.nightRoutine && parsed.nightRoutine.length ? parsed.nightRoutine : demoResult(userContext).nightRoutine,
      selectedTier: tier
    };
  } catch {
    return demoResult(userContext);
  }
}

async function callNim(payload = {}) {
  if (!process.env.NVIDIA_API_KEY) {
    return demoResult(payload);
  }

  const content = [];
  const textPrompt = `Skin Analysis Context:
- User Declared Age Range: ${payload.ageRange || "Not specified"}
- User Goals / Primary Concerns: ${payload.goals || "Barrier repair, general hydration"}
- User Sensitivities / Allergies: ${payload.sensitivities || "None declared"}
- User Budget Preference: ${payload.budget || "Flexible"}

Analyze these inputs under the stated clinical boundary. Recommend safe, evidence-based over-the-counter routines for daytime and nighttime in strict JSON.`;

  content.push({ type: "text", text: textPrompt });

  if (payload.imageData && payload.imageData.startsWith("data:image/")) {
    content.push({
      type: "image_url",
      image_url: { url: payload.imageData }
    });
  }

  const request = {
    model: nimModel,
    messages: [
      { role: "system", content: safetyPrompt },
      { role: "user", content }
    ],
    temperature: 0.2,
    max_tokens: 1500
  };

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error(`NVIDIA NIM returned ${response.status}`);
    const body = await response.json();
    const text = body.choices?.[0]?.message?.content || "";
    return extractJson(text, payload);
  } catch (e) {
    console.error("NIM call error:", e.message);
    return demoResult(payload);
  }
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

  const selectedTier = getCatalogForBudget(body.budget);

  try {
    const analysis = await callNim(body);
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      analysis,
      catalog: selectedTier,
      products: [...selectedTier.daytime, ...selectedTier.nighttime],
      selectedTier
    }));
  } catch (error) {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      analysis: demoResult(body),
      catalog: selectedTier,
      products: [...selectedTier.daytime, ...selectedTier.nighttime],
      selectedTier
    }));
  }
}

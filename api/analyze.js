import { catalog, tiers, getCatalogForBudget, buildPersonalizedRoutine, inventory } from "./catalog.js";

const nimModel = process.env.NVIDIA_NIM_MODEL || "nvidia/nemotron-3.5-super-vl-120b-a12b";
const safetyPrompt = `You are Mira, an intelligent, cautious clinical skincare-education AI. You are not a dermatologist and do not diagnose medical conditions. A photo is insufficient to diagnose hormonal disorders, infections, or severe skin conditions. Use user-declared age range, goals, budget, and sensitivities.

Provide a dedicated, personalized DAYTIME (AM) routine and NIGHTTIME (PM) routine with specific step numbers, timing guidance, and product advice.
Return STRICT JSON ONLY with this exact structure:
{
  "summary": "Concise summary of skin analysis and routine philosophy (classy, professional, supportive)",
  "visibleObservations": ["Non-diagnostic observation 1", "Non-diagnostic observation 2"],
  "careLevel": "routine" or "professional",
  "caution": "Clinical caution notice regarding active patch-testing, SPF adherence, or when to see an MD"
}`;

function demoResult(userContext = {}) {
  const budget = userContext.budget || "";
  const tier = getCatalogForBudget(budget);
  const customBudget = budget ? `within your budget preference of ${budget} (${tier.name})` : `tailored to your ${tier.name}`;

  // Extract concerns from confirmedConcerns array or goals string
  let concerns = [];
  if (Array.isArray(userContext.confirmedConcerns) && userContext.confirmedConcerns.length) {
    concerns = userContext.confirmedConcerns;
  } else if (userContext.goals) {
    concerns = userContext.goals.split(/[,+]/).map(s => s.trim()).filter(Boolean);
  }
  if (!concerns.length) {
    concerns = ["oiliness", "pigmentation", "acne"];
  }

  const isPregnant = userContext.pregnantOrBreastfeeding === true || userContext.pregnantOrBreastfeeding === "yes";
  const isSensitive = userContext.verySensitive === true || userContext.verySensitive === "yes" || userContext.verySensitive === "very";

  const personalized = buildPersonalizedRoutine({
    concerns,
    budget,
    pregnantOrBreastfeeding: isPregnant,
    medication: userContext.medication || "",
    verySensitive: isSensitive,
    allergies: userContext.allergies || userContext.sensitivities || ""
  });

  const dayRoutine = personalized.daytime.map(p => ({
    stepNumber: p.stepNumber,
    step: p.stepTitle || p.category,
    guidance: p.match || p.whyThisProduct,
    category: p.category,
    recommendedProduct: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    whyThisProduct: p.whyThisProduct
  }));

  const nightRoutine = personalized.nighttime.map(p => ({
    stepNumber: p.stepNumber,
    step: p.stepTitle || p.category,
    guidance: p.match || p.whyThisProduct,
    category: p.category,
    recommendedProduct: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    whyThisProduct: p.whyThisProduct
  }));

  return {
    summary: `Your personalized protocol, ${customBudget}. Engineered with distinct daytime barrier shielding and nighttime cellular restoration routines.`,
    visibleObservations: [
      "Skin barrier shows mild daytime trans-epidermal moisture need",
      "Pore clarity and texture suitable for targeted non-colliding actives"
    ],
    careLevel: "routine",
    caution: personalized.patchTestReminder,
    dayRoutine,
    nightRoutine,
    selectedTier: personalized.selectedTier,
    ingredientConflictCheck: personalized.ingredientConflictCheck,
    patchTestReminder: personalized.patchTestReminder,
    dermatologistNotice: personalized.dermatologistNotice,
    catalog: {
      daytime: personalized.daytime,
      nighttime: personalized.nighttime
    }
  };
}

function extractJson(text, userContext = {}) {
  const fallback = demoResult(userContext);
  if (!text) return fallback;
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return fallback;
  }
  const clean = text.slice(firstBrace, lastBrace + 1);
  try {
    const parsed = JSON.parse(clean);
    return {
      ...fallback,
      summary: parsed.summary || fallback.summary,
      visibleObservations: parsed.visibleObservations || fallback.visibleObservations,
      careLevel: parsed.careLevel || fallback.careLevel,
      caution: parsed.caution || fallback.caution
    };
  } catch {
    return fallback;
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
- Confirmed Concerns: ${(payload.confirmedConcerns || []).join(", ")}
- User Sensitivities / Allergies: ${payload.sensitivities || payload.allergies || "None declared"}
- Pregnant / Breastfeeding: ${payload.pregnantOrBreastfeeding || "No"}
- Skin Medication: ${payload.medication || "None"}
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

  const fallback = demoResult(body);
  const selectedTier = fallback.selectedTier;

  // Fast synthesis engine: Race external LLM with a 1.5s timeout so generation takes < 2 seconds
  try {
    let analysis;
    if (process.env.NVIDIA_API_KEY) {
      const nimTimeout = new Promise((resolve) => setTimeout(() => resolve(fallback), 1500));
      analysis = await Promise.race([callNim(body), nimTimeout]);
    } else {
      analysis = fallback;
    }

    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      analysis: analysis || fallback,
      catalog: fallback.catalog,
      daytime: fallback.catalog.daytime,
      nighttime: fallback.catalog.nighttime,
      ingredientConflictCheck: fallback.ingredientConflictCheck,
      patchTestReminder: fallback.patchTestReminder,
      dermatologistNotice: fallback.dermatologistNotice,
      products: [...fallback.catalog.daytime, ...fallback.catalog.nighttime],
      selectedTier
    }));
  } catch (error) {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      analysis: fallback,
      catalog: fallback.catalog,
      daytime: fallback.catalog.daytime,
      nighttime: fallback.catalog.nighttime,
      ingredientConflictCheck: fallback.ingredientConflictCheck,
      patchTestReminder: fallback.patchTestReminder,
      dermatologistNotice: fallback.dermatologistNotice,
      products: [...fallback.catalog.daytime, ...fallback.catalog.nighttime],
      selectedTier
    }));
  }
}

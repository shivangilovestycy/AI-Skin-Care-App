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
  {
    id: "barrier-01",
    category: "Barrier Cream",
    name: "Mira Bio-Lipid Barrier Cream",
    match: "Multi-ceramide barrier reinforcement & lipid recovery",
    matchRate: "96% MATCH",
    price: "₹1,200",
    imageUrl: "/assets/mira-barrier-cream.png",
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
      zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
      official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
    }
  },
  {
    id: "cleanser-01",
    category: "Hydrating Cleanser",
    name: "CeraVe Hydrating Facial Cleanser",
    match: "Gentle non-foaming formula with 3 ceramides & hyaluronic acid",
    matchRate: "94% MATCH",
    price: "₹850",
    imageUrl: "/assets/cerave-cleanser.png",
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+hydrating+cleanser",
      zepto: "https://www.zeptonow.com/search?query=cerave+hydrating+cleanser",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+hydrating+facial+cleanser",
      official: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser"
    }
  },
  {
    id: "serum-01",
    category: "Balancing Serum",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    match: "High-strength vitamin & mineral blemish control",
    matchRate: "92% MATCH",
    price: "₹600",
    imageUrl: "/assets/the-ordinary-niacinamide.png",
    stores: {
      blinkit: "https://blinkit.com/s/?q=the+ordinary+niacinamide",
      zepto: "https://www.zeptonow.com/search?query=the+ordinary+niacinamide",
      nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+niacinamide+10+zinc+1",
      official: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html"
    }
  },
  {
    id: "sunscreen-01",
    category: "Daily UV Defense",
    name: "Minimalist Multi-Vitamin SPF 50 PA++++",
    match: "Broad-spectrum daily protection infused with vitamins A, B, C & E",
    matchRate: "98% MATCH",
    price: "₹399",
    imageUrl: "/assets/minimalist-sunscreen.png",
    stores: {
      blinkit: "https://blinkit.com/s/?q=minimalist+sunscreen+spf+50",
      zepto: "https://www.zeptonow.com/search?query=minimalist+sunscreen+spf+50",
      nykaa: "https://www.nykaa.com/search/result/?q=minimalist+spf+50+sunscreen",
      official: "https://beminimalist.co/products/multi-vitamin-spf-50"
    }
  },
  {
    id: "moisturiser-01",
    category: "Moisturising Cream",
    name: "CeraVe Moisturising Cream (16 oz)",
    match: "Rich, non-comedogenic barrier support for day & night replenishment",
    matchRate: "95% MATCH",
    price: "₹1,450",
    imageUrl: "/assets/cerave-cream.png",
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
      zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
      official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
    }
  }
];

const safetyPrompt = `You are Mira, an intelligent, cautious skincare-education AI. You are not a dermatologist and do not diagnose medical conditions. A photo is insufficient to diagnose hormonal disorders, infections, or severe skin conditions. Use user-declared age range, goals, budget, and sensitivities.

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
      "recommendedProduct": "CeraVe Hydrating Facial Cleanser"
    },
    {
      "stepNumber": "02",
      "step": "Antioxidant & Balancing Serum",
      "guidance": "Apply 2-3 drops to balance oil production, refine texture, and protect from daytime stressors.",
      "category": "Serum",
      "recommendedProduct": "The Ordinary Niacinamide 10% + Zinc 1%"
    },
    {
      "stepNumber": "03",
      "step": "Lightweight Barrier Hydrator",
      "guidance": "Locks in hydration without feeling heavy or causing daytime shine.",
      "category": "Moisturiser",
      "recommendedProduct": "Mira Bio-Lipid Barrier Cream"
    },
    {
      "stepNumber": "04",
      "step": "Broad-Spectrum SPF 50+ Sunscreen",
      "guidance": "Crucial non-negotiable step: shields skin against UVA/UVB rays and hyperpigmentation.",
      "category": "Sunscreen",
      "recommendedProduct": "Minimalist Multi-Vitamin SPF 50 PA++++"
    }
  ],
  "nightRoutine": [
    {
      "stepNumber": "01",
      "step": "Deep Evening Cleanse",
      "guidance": "Thoroughly removes pollution, sunscreen, and daily buildup to allow overnight cellular renewal.",
      "category": "Cleanser",
      "recommendedProduct": "CeraVe Hydrating Facial Cleanser"
    },
    {
      "stepNumber": "02",
      "step": "Targeted Treatment / Active",
      "guidance": "Introduce active ingredients slowly (2-3x per week). Patch test before full facial application.",
      "category": "Serum",
      "recommendedProduct": "The Ordinary Niacinamide 10% + Zinc 1%"
    },
    {
      "stepNumber": "03",
      "step": "Overnight Barrier Repair Cream",
      "guidance": "Rich ceramide and fatty acid replenishment while your skin regenerates during sleep.",
      "category": "Barrier Cream",
      "recommendedProduct": "Mira Bio-Lipid Barrier Cream"
    }
  ],
  "heroProduct": {
    "name": "Mira Bio-Lipid Barrier Cream",
    "category": "Barrier Cream",
    "matchRate": "96% MATCH",
    "price": "₹1,200",
    "headline": "Chosen for your skin barrier and your budget",
    "imageUrl": "/assets/mira-barrier-cream.png"
  },
  "productCategories": ["Cleanser", "Serum", "Barrier Cream", "Sunscreen"]
}`;

function loadEnv(file) {
  try {
    const text = requireText(file);
    text.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    });
  } catch { /* .env is optional */ }
}
function requireText(file) { return readFileSync(file, "utf8"); }

function json(res, status, value) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

function demoResult(userContext = {}) {
  const customBudget = userContext.budget ? `within your budget preference of ${userContext.budget}` : "customized for your skin";
  return {
    summary: `Your personalized dual-sequence protocol, ${customBudget}. Designed to strengthen your natural lipid barrier during the day and accelerate cellular repair overnight.`,
    visibleObservations: [
      "Skin barrier shows mild daytime trans-epidermal moisture need",
      "Balanced pore clarity suitable for targeted barrier-restorative actives"
    ],
    careLevel: "routine",
    caution: "Always patch test new actives on your inner forearm. If stinging, persistent redness, or swelling occurs, discontinue use immediately. Consult a licensed dermatologist for chronic conditions.",
    dayRoutine: [
      {
        stepNumber: "01",
        step: "Gentle Morning Cleanse",
        guidance: "Cleanse with lukewarm water and a non-stripping cleanser to preserve natural lipid mantle.",
        category: "Cleanser",
        recommendedProduct: "CeraVe Hydrating Facial Cleanser"
      },
      {
        stepNumber: "02",
        step: "Antioxidant / Balancing Serum",
        guidance: "Apply 2-3 drops of Niacinamide to balance sebum, soothe irritation, and shield from oxidative stress.",
        category: "Serum",
        recommendedProduct: "The Ordinary Niacinamide 10% + Zinc 1%"
      },
      {
        stepNumber: "03",
        step: "Barrier Restoring Moisturiser",
        guidance: "Smooth a pea-sized amount to lock in hydration without clogging pores.",
        category: "Barrier Cream",
        recommendedProduct: "Mira Bio-Lipid Barrier Cream"
      },
      {
        stepNumber: "04",
        step: "Broad-Spectrum SPF 50+ Sunscreen",
        guidance: "Non-negotiable daily shield. Apply two finger-lengths across face and neck.",
        category: "Sunscreen",
        recommendedProduct: "Minimalist Multi-Vitamin SPF 50 PA++++"
      }
    ],
    nightRoutine: [
      {
        stepNumber: "01",
        step: "Evening Deep Purifying Cleanse",
        guidance: "Removes accumulated atmospheric grime, sunscreen filters, and excess sebum from the day.",
        category: "Cleanser",
        recommendedProduct: "CeraVe Hydrating Facial Cleanser"
      },
      {
        stepNumber: "02",
        step: "Targeted Overnight Serum",
        guidance: "Supports cellular repair. Introduce active serums gradually to avoid compromising the stratum corneum.",
        category: "Serum",
        recommendedProduct: "The Ordinary Niacinamide 10% + Zinc 1%"
      },
      {
        stepNumber: "03",
        step: "Intense Barrier Recovery Cream",
        guidance: "Generous application of essential ceramides to repair and replenish skin while sleeping.",
        category: "Barrier Cream",
        recommendedProduct: "Mira Bio-Lipid Barrier Cream"
      }
    ],
    heroProduct: {
      name: "Mira Bio-Lipid Barrier Cream",
      category: "Barrier Cream",
      matchRate: "96% MATCH",
      price: "₹1,200",
      headline: "Chosen for your skin barrier and your budget",
      imageUrl: "/assets/mira-barrier-cream.png"
    },
    productCategories: ["Cleanser", "Serum", "Barrier Cream", "Sunscreen"]
  };
}

function extractJson(text, userContext = {}) {
  if (!text) return demoResult(userContext);
  try {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const candidate = text.substring(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(candidate);
      if (!parsed.dayRoutine || !parsed.nightRoutine) {
        const fallback = demoResult(userContext);
        if (!parsed.dayRoutine) parsed.dayRoutine = fallback.dayRoutine;
        if (!parsed.nightRoutine) parsed.nightRoutine = fallback.nightRoutine;
      }
      if (!parsed.heroProduct) {
        parsed.heroProduct = demoResult(userContext).heroProduct;
      }
      return parsed;
    }
  } catch (err) {
    console.warn("JSON extraction failed, using fallback:", err);
  }
  return demoResult(userContext);
}

async function callNim(payload) {
  if (!process.env.NVIDIA_API_KEY) return demoResult(payload);
  const imagePart = payload.imageData ? [{ type: "image_url", image_url: { url: payload.imageData } }] : [];
  const request = {
    model: nimModel,
    temperature: 0.2,
    top_p: 0.95,
    max_tokens: 1500,
    messages: [
      { role: "system", content: safetyPrompt },
      { role: "user", content: [
        { type: "text", text: `User declared profile: Age Range: ${payload.ageRange || "Not specified"}. Skin Goals: ${payload.goals || "Overall healthy barrier"}. Sensitivities: ${payload.sensitivities || "None reported"}. Customer Budget: ${payload.budget || "Flexible / open"}. Produce a cautious AM (Daytime) and PM (Nighttime) routine and select a matched hero product.` },
        ...imagePart
      ]}
    ]
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
  if (req.method === "GET" && req.url === "/api/catalog") return json(res, 200, { products: catalog });
  if (req.method === "POST" && req.url === "/api/analyze") {
    let raw = ""; req.on("data", (part) => raw += part); req.on("end", async () => {
      try { json(res, 200, { analysis: await callNim(JSON.parse(raw || "{}")), catalog }); }
      catch (error) { json(res, 200, { analysis: demoResult(), catalog }); }
    }); return;
  }
  if (req.method === "GET") return sendFile(req, res);
  json(res, 405, { error: "Method not allowed" });
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

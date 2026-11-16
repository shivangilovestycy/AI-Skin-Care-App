import http from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(root, ".env"));

const port = Number(process.env.PORT || 3000);
const nimModel = process.env.NVIDIA_NIM_MODEL || "nvidia/nemotron-3.5-super-vl-120b-a12b";

const catalog = {
  daytime: [
    {
      id: "day-01",
      category: "Gentle Morning Cleanse",
      name: "CeraVe Hydrating Facial Cleanser",
      match: "Non-stripping lotion cleanser with 3 essential ceramides & hyaluronic acid for morning barrier protection.",
      matchRate: "97% MATCH",
      price: "₹850",
      step: "01",
      timing: "Morning (AM)",
      imageUrl: "/assets/cerave-cleanser.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=cerave+hydrating+cleanser",
        zepto: "https://www.zeptonow.com/search?query=cerave+hydrating+cleanser",
        nykaa: "https://www.nykaa.com/search/result/?q=cerave+hydrating+facial+cleanser",
        official: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser"
      }
    },
    {
      id: "day-02",
      category: "Antioxidant & Sebum Balance",
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      match: "Controls excess daytime sebum, refines skin texture, and fortifies the lipid barrier under sunscreen.",
      matchRate: "94% MATCH",
      price: "₹600",
      step: "02",
      timing: "Morning (AM)",
      imageUrl: "/assets/the-ordinary-niacinamide.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=the+ordinary+niacinamide",
        zepto: "https://www.zeptonow.com/search?query=the+ordinary+niacinamide",
        nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+niacinamide+10+zinc+1",
        official: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html"
      }
    },
    {
      id: "day-03",
      category: "Lightweight Barrier Moisture",
      name: "CeraVe Daily Moisturising Lotion",
      match: "Lightweight, oil-free hydration with MVE delivery technology for sustained 24-hour hydration.",
      matchRate: "95% MATCH",
      price: "₹1,200",
      step: "03",
      timing: "Morning (AM)",
      imageUrl: "/assets/cerave-cream.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
        zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
        nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+lotion",
        official: "https://www.cerave.com/skincare/moisturizers/daily-moisturizing-lotion"
      }
    },
    {
      id: "day-04",
      category: "Broad-Spectrum UV Shield",
      name: "Minimalist Multi-Vitamin SPF 50 PA++++",
      match: "Essential broad-spectrum protection infused with vitamins A, B, C & E. Leaves zero white cast and prevents photodamage.",
      matchRate: "99% MATCH",
      price: "₹399",
      step: "04",
      timing: "Morning (AM)",
      imageUrl: "/assets/minimalist-sunscreen.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=minimalist+sunscreen+spf+50",
        zepto: "https://www.zeptonow.com/search?query=minimalist+sunscreen+spf+50",
        nykaa: "https://www.nykaa.com/search/result/?q=minimalist+multi+vitamin+spf+50",
        official: "https://beminimalist.co/products/multi-vitamin-spf-50"
      }
    }
  ],
  nighttime: [
    {
      id: "night-01",
      category: "Purifying Evening Cleanse",
      name: "Cetaphil Gentle Skin Cleanser",
      match: "Clinically proven formula with niacinamide & panthenol to melt away daily grime, sunscreen, and particulate pollution.",
      matchRate: "96% MATCH",
      price: "₹399",
      step: "01",
      timing: "Night (PM)",
      imageUrl: "/assets/cetaphil-cleanser.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=cetaphil+gentle+skin+cleanser",
        zepto: "https://www.zeptonow.com/search?query=cetaphil+gentle+skin+cleanser",
        nykaa: "https://www.nykaa.com/search/result/?q=cetaphil+gentle+skin+cleanser",
        official: "https://www.cetaphil.in/cleansers/gentle-skin-cleanser"
      }
    },
    {
      id: "night-02",
      category: "Cellular Renewal & Anti-Aging",
      name: "The Ordinary Retinol 0.2% in Squalane",
      match: "Pure active retinol in stabilizing squalane. Accelerates overnight cell turnover, clears microcomedones, and smoothes fine lines.",
      matchRate: "93% MATCH",
      price: "₹700",
      step: "02",
      timing: "Night (PM)",
      imageUrl: "/assets/the-ordinary-retinol.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=the+ordinary+retinol",
        zepto: "https://www.zeptonow.com/search?query=the+ordinary+retinol",
        nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+retinol+0.2+in+squalane",
        official: "https://theordinary.com/en-in/retinol-02pct-in-squalane-serum-100439.html"
      }
    },
    {
      id: "night-03",
      category: "Deep Overnight Barrier Recovery",
      name: "CeraVe Moisturising Cream (16 oz)",
      match: "Rich ceramide complex with hyaluronic acid to seal in nighttime actives and rebuild the stratum corneum while you sleep.",
      matchRate: "98% MATCH",
      price: "₹1,450",
      step: "03",
      timing: "Night (PM)",
      imageUrl: "/assets/cerave-cream.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
        zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
        nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
        official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
      }
    }
  ]
};

const productsList = [...catalog.daytime, ...catalog.nighttime];

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

function demoResult(userContext = {}) {
  const customBudget = userContext.budget ? `within your budget preference of ${userContext.budget}` : "customized for your skin";
  return {
    summary: `Your personalized clinical protocol, ${customBudget}. Engineered with distinct daytime barrier shielding and nighttime cellular restoration routines.`,
    visibleObservations: [
      "Skin barrier shows mild daytime trans-epidermal moisture need",
      "Balanced pore clarity suitable for targeted active ingredients"
    ],
    careLevel: "routine",
    caution: "Always patch test new actives on your inner forearm. If stinging, persistent redness, or swelling occurs, discontinue use immediately. Consult a licensed dermatologist for chronic conditions.",
    dayRoutine: [
      {
        stepNumber: "01",
        step: "Gentle Morning Cleanse",
        guidance: "Cleanse with lukewarm water and a non-stripping cleanser to preserve your natural lipid mantle.",
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
        guidance: "Smooth a pea-sized amount to lock in hydration without clogging pores or feeling greasy.",
        category: "Moisturiser",
        recommendedProduct: "CeraVe Daily Moisturising Lotion"
      },
      {
        stepNumber: "04",
        step: "Broad-Spectrum SPF 50+ Sunscreen",
        guidance: "Non-negotiable daily shield. Apply two finger-lengths across face and neck 15 mins before sun exposure.",
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
        recommendedProduct: "Cetaphil Gentle Skin Cleanser"
      },
      {
        stepNumber: "02",
        step: "Targeted Overnight Serum",
        guidance: "Accelerates cellular turnover and collagen synthesis. Introduce active retinoids gradually 2-3 nights a week.",
        category: "Active Serum",
        recommendedProduct: "The Ordinary Retinol 0.2% in Squalane"
      },
      {
        stepNumber: "03",
        step: "Intense Barrier Recovery Cream",
        guidance: "Generous application of essential ceramides to repair and replenish skin while sleeping.",
        category: "Night Cream",
        recommendedProduct: "CeraVe Moisturising Cream (16 oz)"
      }
    ]
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
  if ((req.method === "GET" || req.method === "HEAD") && req.url === "/api/catalog") {
    return json(res, 200, {
      catalog,
      products: productsList,
      daytime: catalog.daytime,
      nighttime: catalog.nighttime
    });
  }
  if (req.method === "POST" && req.url === "/api/analyze") {
    let raw = ""; req.on("data", (part) => raw += part); req.on("end", async () => {
      try {
        const body = JSON.parse(raw || "{}");
        json(res, 200, { analysis: demoResult(body), catalog, products: productsList });
      } catch (error) {
        json(res, 200, { analysis: demoResult(), catalog, products: productsList });
      }
    }); return;
  }
  if (req.method === "GET" || req.method === "HEAD") return sendFile(req, res);
  json(res, 405, { error: "Method not allowed" });
}).listen(port, () => console.log(`Mira is running at http://localhost:${port}`));

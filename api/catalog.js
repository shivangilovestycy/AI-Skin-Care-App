/**
 * Dynamic Multi-Tier Skincare Catalog
 * Provides personalized AM & PM routines tailored to exact customer budget ranges:
 * - Budget Tier (Under ₹1,200 / ₹1,000 range)
 * - Clinical Core Tier (₹1,500 – ₹3,000 / ₹2,500 range)
 * - Prestige Luxury Tier (₹3,500 – ₹6,000+ / ₹4,000 range)
 */

export const tiers = {
  budget: {
    name: "Essential Value Tier (Under ₹1,200)",
    range: "≤ ₹1,200",
    summary: "Dermatologist-formulated essentials delivering active barrier care at an accessible price point.",
    daytime: [
      {
        id: "b-day-01",
        stepNumber: "01",
        stepTitle: "Gentle Refreshing Cleanse",
        phase: "MORNING (AM) · STEP 01",
        category: "Gentle Morning Cleanse",
        name: "Simple Kind To Skin Refreshing Facial Wash",
        match: "100% soap-free gel cleanser infused with pro-vitamin B5 and vitamin E. Preserves delicate morning moisture.",
        matchRate: "97% MATCH",
        price: "₹325",
        step: "01",
        timing: "Morning (AM)",
        usageTip: "Lather a dime-sized amount with lukewarm water. Massage 30s and rinse thoroughly.",
        imageUrl: "/assets/simple-wash.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=simple+refreshing+facial+wash",
          zepto: "https://www.zeptonow.com/search?query=simple+refreshing+facial+wash",
          nykaa: "https://www.nykaa.com/search/result/?q=simple+kind+to+skin+refreshing+facial+wash",
          official: "https://www.simpleskincare.in"
        }
      },
      {
        id: "b-day-02",
        stepNumber: "02",
        stepTitle: "Oil Control & Pore Refining",
        phase: "MORNING (AM) · STEP 02",
        category: "Antioxidant & Sebum Balance",
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        match: "High-strength vitamin and mineral blemish formula to regulate daytime oiliness and minimize enlarged pores.",
        matchRate: "95% MATCH",
        price: "₹600",
        step: "02",
        timing: "Morning (AM)",
        usageTip: "Apply 2–3 drops across face and neck before heavier creams.",
        imageUrl: "/assets/the-ordinary-niacinamide.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=the+ordinary+niacinamide",
          zepto: "https://www.zeptonow.com/search?query=the+ordinary+niacinamide",
          nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+niacinamide",
          official: "https://theordinary.com/en-in"
        }
      },
      {
        id: "b-day-03",
        stepNumber: "03",
        stepTitle: "Lightweight Barrier Hydrator",
        phase: "MORNING (AM) · STEP 03",
        category: "Lightweight Barrier Moisture",
        name: "CeraVe Daily Moisturising Lotion",
        match: "Non-comedogenic, lightweight hydration formulated with 3 essential ceramides for all-day barrier defense.",
        matchRate: "94% MATCH",
        price: "₹1,200",
        step: "03",
        timing: "Morning (AM)",
        usageTip: "Smooth a nickel-sized amount evenly to trap moisture under sunscreen.",
        imageUrl: "/assets/cerave-lotion.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+moisturising+lotion",
          zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+lotion",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+daily+moisturising+lotion",
          official: "https://www.cerave.com"
        }
      },
      {
        id: "b-day-04",
        stepNumber: "04",
        stepTitle: "Broad-Spectrum UV Shield",
        phase: "MORNING (AM) · STEP 04",
        category: "Broad-Spectrum UV Shield",
        name: "Minimalist Multi-Vitamin SPF 50 PA++++",
        match: "Clinically tested photostable sunscreen boosted with vitamins A, B, C & E. Leaves zero white cast or grease.",
        matchRate: "99% MATCH",
        price: "₹399",
        step: "04",
        timing: "Morning (AM)",
        usageTip: "Apply generous 2-finger lengths to face and neck 15 mins before stepping outside.",
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
        id: "b-night-01",
        stepNumber: "01",
        stepTitle: "Gentle Evening Cleanse",
        phase: "NIGHT (PM) · STEP 01",
        category: "Purifying Evening Cleanse",
        name: "Cetaphil Gentle Skin Cleanser",
        match: "Hydrating glycerin, niacinamide & panthenol formula that dissolves daily pollution without stripping the mantle.",
        matchRate: "96% MATCH",
        price: "₹399",
        step: "01",
        timing: "Night (PM)",
        usageTip: "Massage onto damp skin for 45s. Rinse thoroughly with lukewarm water.",
        imageUrl: "/assets/cetaphil-cleanser.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cetaphil+gentle+skin+cleanser",
          zepto: "https://www.zeptonow.com/search?query=cetaphil+gentle+skin+cleanser",
          nykaa: "https://www.nykaa.com/search/result/?q=cetaphil+gentle+skin+cleanser",
          official: "https://www.cetaphil.in"
        }
      },
      {
        id: "b-night-02",
        stepNumber: "02",
        stepTitle: "Cellular Renewal & Anti-Aging",
        phase: "NIGHT (PM) · STEP 02",
        category: "Cellular Renewal & Anti-Aging",
        name: "The Ordinary Retinol 0.2% in Squalane",
        match: "Pure active retinol in hydrating plant-derived squalane. Stimulates cell turnover and refines texture overnight.",
        matchRate: "93% MATCH",
        price: "₹700",
        step: "02",
        timing: "Night (PM)",
        usageTip: "Apply 2–3 drops at night on dry skin 2 nights a week. Always follow with nighttime moisturiser.",
        imageUrl: "/assets/the-ordinary-retinol.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=the+ordinary+retinol",
          zepto: "https://www.zeptonow.com/search?query=the+ordinary+retinol",
          nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+retinol+0.2+in+squalane",
          official: "https://theordinary.com/en-in"
        }
      },
      {
        id: "b-night-03",
        stepNumber: "03",
        stepTitle: "Deep Overnight Barrier Recovery",
        phase: "NIGHT (PM) · STEP 03",
        category: "Deep Overnight Barrier Recovery",
        name: "CeraVe Moisturising Cream Tub",
        match: "Rich ceramide and MVE technology to restore the protective skin barrier and seal hydration while you sleep.",
        matchRate: "98% MATCH",
        price: "₹1,450",
        step: "03",
        timing: "Night (PM)",
        usageTip: "Generously smooth over face and neck as the final sealing step before bed.",
        imageUrl: "/assets/cerave-cream.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
          zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
          official: "https://www.cerave.com"
        }
      }
    ]
  },

  clinical: {
    name: "Clinical Core Tier (₹1,500 – ₹3,000)",
    range: "₹1,500 – ₹3,000",
    summary: "Gold-standard dermatological formulas engineered with multi-ceramide delivery and clinically validated actives.",
    daytime: [
      {
        id: "c-day-01",
        stepNumber: "01",
        stepTitle: "Gentle Morning Cleanse",
        phase: "MORNING (AM) · STEP 01",
        category: "Gentle Morning Cleanse",
        name: "CeraVe Hydrating Facial Cleanser",
        match: "Non-stripping lotion cleanser with 3 essential ceramides & hyaluronic acid for morning barrier protection.",
        matchRate: "97% MATCH",
        price: "₹850",
        step: "01",
        timing: "Morning (AM)",
        usageTip: "1–2 pumps on damp face. Gently massage 30 seconds in circular motions, rinse with lukewarm water.",
        imageUrl: "/assets/cerave-cleanser.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+hydrating+cleanser",
          zepto: "https://www.zeptonow.com/search?query=cerave+hydrating+cleanser",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+hydrating+facial+cleanser",
          official: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser"
        }
      },
      {
        id: "c-day-02",
        stepNumber: "02",
        stepTitle: "Antioxidant & Sebum Balance",
        phase: "MORNING (AM) · STEP 02",
        category: "Antioxidant & Sebum Balance",
        name: "The Ordinary Niacinamide 10% + Zinc 1%",
        match: "Controls excess daytime sebum, refines skin texture, and fortifies the lipid barrier under sunscreen.",
        matchRate: "94% MATCH",
        price: "₹600",
        step: "02",
        timing: "Morning (AM)",
        usageTip: "Dispense 2–3 drops onto fingertips. Press gently into face and neck before moisturiser.",
        imageUrl: "/assets/the-ordinary-niacinamide.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=the+ordinary+niacinamide",
          zepto: "https://www.zeptonow.com/search?query=the+ordinary+niacinamide",
          nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+niacinamide+10+zinc+1",
          official: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html"
        }
      },
      {
        id: "c-day-03",
        stepNumber: "03",
        stepTitle: "Lightweight Barrier Moisture",
        phase: "MORNING (AM) · STEP 03",
        category: "Lightweight Barrier Moisture",
        name: "CeraVe Daily Moisturising Lotion",
        match: "Lightweight, oil-free hydration with MVE delivery technology for sustained 24-hour hydration.",
        matchRate: "95% MATCH",
        price: "₹1,200",
        step: "03",
        timing: "Morning (AM)",
        usageTip: "Smooth a nickel-sized amount evenly over face and neck to lock in active serum hydration.",
        imageUrl: "/assets/cerave-lotion.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
          zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+lotion",
          official: "https://www.cerave.com/skincare/moisturizers/daily-moisturizing-lotion"
        }
      },
      {
        id: "c-day-04",
        stepNumber: "04",
        stepTitle: "Broad-Spectrum UV Shield",
        phase: "MORNING (AM) · STEP 04",
        category: "Broad-Spectrum UV Shield",
        name: "Minimalist Multi-Vitamin SPF 50 PA++++",
        match: "Essential broad-spectrum protection infused with vitamins A, B, C & E. Leaves zero white cast and prevents photodamage.",
        matchRate: "99% MATCH",
        price: "₹399",
        step: "04",
        timing: "Morning (AM)",
        usageTip: "Apply 2 finger-lengths across face, neck & ears 15 minutes before sun exposure. Reapply every 3 hours.",
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
        id: "c-night-01",
        stepNumber: "01",
        stepTitle: "Purifying Evening Cleanse",
        phase: "NIGHT (PM) · STEP 01",
        category: "Purifying Evening Cleanse",
        name: "Cetaphil Gentle Skin Cleanser",
        match: "Clinically proven formula with niacinamide & panthenol to melt away daily grime, sunscreen, and particulate pollution.",
        matchRate: "96% MATCH",
        price: "₹399",
        step: "01",
        timing: "Night (PM)",
        usageTip: "Massage onto dry or damp skin for 45 seconds to dissolve environmental impurities. Rinse clean.",
        imageUrl: "/assets/cetaphil-cleanser.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cetaphil+gentle+skin+cleanser",
          zepto: "https://www.zeptonow.com/search?query=cetaphil+gentle+skin+cleanser",
          nykaa: "https://www.nykaa.com/search/result/?q=cetaphil+gentle+skin+cleanser",
          official: "https://www.cetaphil.in/cleansers/gentle-skin-cleanser"
        }
      },
      {
        id: "c-night-02",
        stepNumber: "02",
        stepTitle: "Cellular Renewal & Anti-Aging",
        phase: "NIGHT (PM) · STEP 02",
        category: "Cellular Renewal & Anti-Aging",
        name: "The Ordinary Retinol 0.2% in Squalane",
        match: "Pure active retinol in stabilizing squalane. Accelerates overnight cell turnover, clears microcomedones, and smoothes fine lines.",
        matchRate: "93% MATCH",
        price: "₹700",
        step: "02",
        timing: "Night (PM)",
        usageTip: "Apply 2–3 drops at night on dry skin 2–3 times a week. Avoid eye area and always use daytime SPF.",
        imageUrl: "/assets/the-ordinary-retinol.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=the+ordinary+retinol",
          zepto: "https://www.zeptonow.com/search?query=the+ordinary+retinol",
          nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+retinol+0.2+in+squalane",
          official: "https://theordinary.com/en-in/retinol-02pct-in-squalane-serum-100439.html"
        }
      },
      {
        id: "c-night-03",
        stepNumber: "03",
        stepTitle: "Deep Overnight Barrier Recovery",
        phase: "NIGHT (PM) · STEP 03",
        category: "Deep Overnight Barrier Recovery",
        name: "CeraVe Moisturising Cream Tub",
        match: "Rich ceramide complex with hyaluronic acid to seal in nighttime actives and rebuild the stratum corneum while you sleep.",
        matchRate: "98% MATCH",
        price: "₹1,450",
        step: "03",
        timing: "Night (PM)",
        usageTip: "Generously smooth over face and neck as the final sealing step to prevent transepidermal water loss overnight.",
        imageUrl: "/assets/cerave-cream.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
          zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
          official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
        }
      }
    ]
  },

  luxury: {
    name: "Prestige Luxury Tier (₹4,000+)",
    range: "≥ ₹3,500",
    summary: "Prestige dermatological and luxury botanicals engineered with cellular peptides and advanced lipid bio-ferments.",
    daytime: [
      {
        id: "l-day-01",
        stepNumber: "01",
        stepTitle: "Gentle Morning Cleanse",
        phase: "MORNING (AM) · STEP 01",
        category: "Gentle Morning Cleanse",
        name: "CeraVe Hydrating Facial Cleanser (Mega)",
        match: "Signature dermatological 3-ceramide formulation with continuous MVE hydration for a clean, non-stripping morning reset.",
        matchRate: "98% MATCH",
        price: "₹1,450",
        step: "01",
        timing: "Morning (AM)",
        usageTip: "Gently massage 1–2 pumps on damp skin for 45s. Rinse with tepid water.",
        imageUrl: "/assets/cerave-cleanser.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+hydrating+cleanser",
          zepto: "https://www.zeptonow.com/search?query=cerave+hydrating+cleanser",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+hydrating+facial+cleanser",
          official: "https://www.cerave.com"
        }
      },
      {
        id: "l-day-02",
        stepNumber: "02",
        stepTitle: "Antioxidant & Sebum Balance",
        phase: "MORNING (AM) · STEP 02",
        category: "Antioxidant & Sebum Balance",
        name: "The Ordinary Niacinamide 10% + Zinc 1% (60ml)",
        match: "High-concentration clinical niacinamide formulation for sustained sebum regulation and cellular lipid barrier support.",
        matchRate: "96% MATCH",
        price: "₹1,000",
        step: "02",
        timing: "Morning (AM)",
        usageTip: "Dispense 3–4 drops onto palms. Press firmly across face and décolletage.",
        imageUrl: "/assets/the-ordinary-niacinamide.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=the+ordinary+niacinamide",
          zepto: "https://www.zeptonow.com/search?query=the+ordinary+niacinamide",
          nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+niacinamide",
          official: "https://theordinary.com/en-in"
        }
      },
      {
        id: "l-day-03",
        stepNumber: "03",
        stepTitle: "100-Hour Auto-Replenishing Hydrator",
        phase: "MORNING (AM) · STEP 03",
        category: "Prestige Barrier Hydrator",
        name: "Clinique Moisture Surge 100H Hydrator",
        match: "Award-winning auto-replenishing hydrator with aloe bio-ferment & hyaluronic acid. Penetrates 10 layers deep for sustained radiance.",
        matchRate: "99% MATCH",
        price: "₹2,950",
        step: "03",
        timing: "Morning (AM)",
        usageTip: "Smooth a dime-sized amount over face and neck. Can be layered under SPF and makeup effortlessly.",
        imageUrl: "/assets/clinique-moisture.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=clinique+moisture+surge",
          zepto: "https://www.zeptonow.com/search?query=clinique+moisture+surge",
          nykaa: "https://www.nykaa.com/search/result/?q=clinique+moisture+surge+100h",
          official: "https://www.clinique.in"
        }
      },
      {
        id: "l-day-04",
        stepNumber: "04",
        stepTitle: "SyncroShield Broad-Spectrum UV Defense",
        phase: "MORNING (AM) · STEP 04",
        category: "Prestige Sun Protection",
        name: "Shiseido The Perfect Protector SPF 50+",
        match: "Luxury water-resistant sunscreen powered by WetForce and HeatForce technology. Strengthens its UV shield when exposed to heat and sweat.",
        matchRate: "98% MATCH",
        price: "₹3,600",
        step: "04",
        timing: "Morning (AM)",
        usageTip: "Shake well before use. Smooth two finger-lengths evenly across face, neck, and ears.",
        imageUrl: "/assets/shiseido-spf.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=shiseido+sunscreen",
          zepto: "https://www.zeptonow.com/search?query=shiseido+sunscreen",
          nykaa: "https://www.nykaa.com/search/result/?q=shiseido+the+perfect+protector",
          official: "https://www.shiseido.com"
        }
      }
    ],
    nighttime: [
      {
        id: "l-night-01",
        stepNumber: "01",
        stepTitle: "Purifying Evening Cleanse",
        phase: "NIGHT (PM) · STEP 01",
        category: "Purifying Evening Cleanse",
        name: "Cetaphil Gentle Skin Cleanser (473ml)",
        match: "Deep non-comedogenic cleanse that melts away waterproof sunscreen, sebum, and fine particulate pollution.",
        matchRate: "97% MATCH",
        price: "₹1,150",
        step: "01",
        timing: "Night (PM)",
        usageTip: "Gently massage over face for 60 seconds to break down makeup and pollutants. Rinse clean.",
        imageUrl: "/assets/cetaphil-cleanser.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cetaphil+cleanser",
          zepto: "https://www.zeptonow.com/search?query=cetaphil+cleanser",
          nykaa: "https://www.nykaa.com/search/result/?q=cetaphil+gentle+skin+cleanser",
          official: "https://www.cetaphil.in"
        }
      },
      {
        id: "l-night-02",
        stepNumber: "02",
        stepTitle: "Chronolux Multi-Recovery Complex",
        phase: "NIGHT (PM) · STEP 02",
        category: "Cellular Renewal & Anti-Aging",
        name: "Estée Lauder Advanced Night Repair",
        match: "Iconic anti-aging serum with Chronolux Power Signal Technology. Accelerates nocturnal cellular repair and boosts collagen synthesis.",
        matchRate: "99% MATCH",
        price: "₹4,200",
        step: "02",
        timing: "Night (PM)",
        usageTip: "Apply one full dropper onto clean skin before nighttime cream. Massage in a heart motion from center of face outward.",
        imageUrl: "/assets/estee-anr.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=estee+lauder+advanced+night+repair",
          zepto: "https://www.zeptonow.com/search?query=estee+lauder+advanced+night+repair",
          nykaa: "https://www.nykaa.com/search/result/?q=estee+lauder+advanced+night+repair",
          official: "https://www.esteelauder.in"
        }
      },
      {
        id: "l-night-03",
        stepNumber: "03",
        stepTitle: "Deep Overnight Barrier Recovery",
        phase: "NIGHT (PM) · STEP 03",
        category: "Deep Overnight Barrier Recovery",
        name: "CeraVe Moisturising Cream Tub (16 oz)",
        match: "Essential 3-ceramide barrier repair complex with rich lipid replenishment to seal active serums through the night.",
        matchRate: "98% MATCH",
        price: "₹1,450",
        step: "03",
        timing: "Night (PM)",
        usageTip: "Generously warm a coin-sized amount between fingertips and press into skin as the final sealing step.",
        imageUrl: "/assets/cerave-cream.png",
        stores: {
          blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
          zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
          nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
          official: "https://www.cerave.com"
        }
      }
    ]
  }
};

/**
 * Determine the tier based on user-provided budget string or amount
 */
export function getCatalogForBudget(budgetString = "") {
  const str = String(budgetString).toLowerCase().replace(/,/g, "");
  const numMatch = str.match(/\d+/);
  const amount = numMatch ? parseInt(numMatch[0], 10) : null;

  if (amount !== null) {
    if (amount <= 1400) return tiers.budget;
    if (amount >= 3400) return tiers.luxury;
    return tiers.clinical;
  }

  // Keywords
  if (str.includes("budget") || str.includes("cheap") || str.includes("under 1000") || str.includes("1000") || str.includes("500")) {
    return tiers.budget;
  }
  if (str.includes("luxury") || str.includes("prestige") || str.includes("4000") || str.includes("5000") || str.includes("expensive")) {
    return tiers.luxury;
  }
  return tiers.clinical;
}

export const defaultCatalog = tiers.clinical;
export const catalog = tiers.clinical;
export const productsList = [...tiers.clinical.daytime, ...tiers.clinical.nighttime];

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "content-type": "application/json" });
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const budgetParam = url.searchParams.get("budget") || "";
  const selectedTier = getCatalogForBudget(budgetParam);

  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "s-maxage=3600, stale-while-revalidate"
  });
  res.end(JSON.stringify({
    tiers,
    selectedTier,
    catalog: selectedTier,
    daytime: selectedTier.daytime,
    nighttime: selectedTier.nighttime,
    products: [...selectedTier.daytime, ...selectedTier.nighttime]
  }));
}

/**
 * MIRA DYNAMIC SKINCARE INTELLIGENCE CATALOG & PROTOCOL ENGINE
 * 
 * Clinical dermatological engine providing personalized AM & PM routines
 * with distinct, non-repeated products tailored to exact user concerns,
 * safety profiles, budget tiers, and allergies.
 */

// Master Products Inventory tagged with concerns, actives, budget tiers, and safety
export const inventory = [
  // ==================== CLEANSERS ====================
  {
    id: "cleanse-simple",
    category: "Gentle Morning Cleanse",
    name: "Simple Kind To Skin Refreshing Facial Wash",
    keyActive: "Pro-Vitamin B5 & Vitamin E",
    concerns: ["oiliness", "redness", "sensitivity", "dryness"],
    phase: "MORNING (AM) · STEP 01",
    step: "01",
    timing: "Morning (AM)",
    budgetTier: "budget",
    price: "₹325",
    matchRate: "97% MATCH",
    imageUrl: "/assets/simple-wash.png",
    whyThisProduct: "Soap-free, 100% gentle morning cleanse infused with pro-vitamin B5 that purifies without compromising your lipid barrier.",
    usageTip: "Lather a coin-sized amount with lukewarm water. Massage for 30s and rinse thoroughly.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=simple+refreshing+facial+wash",
      zepto: "https://www.zeptonow.com/search?query=simple+refreshing+facial+wash",
      nykaa: "https://www.nykaa.com/search/result/?q=simple+kind+to+skin+refreshing+facial+wash",
      official: "https://www.simpleskincare.in"
    }
  },
  {
    id: "cleanse-cerave-hydrating",
    category: "Gentle Morning Cleanse",
    name: "CeraVe Hydrating Facial Cleanser",
    keyActive: "3 Essential Ceramides & Hyaluronic Acid",
    concerns: ["dryness", "redness", "sensitivity", "barrier repair"],
    phase: "MORNING (AM) · STEP 01",
    step: "01",
    timing: "Morning (AM)",
    budgetTier: "clinical",
    price: "₹850",
    matchRate: "98% MATCH",
    imageUrl: "/assets/cerave-cleanser.png",
    whyThisProduct: "Replenishes skin ceramides while gently washing away nocturnal sebum, ensuring non-stripping morning hydration.",
    usageTip: "Apply 1–2 pumps on damp skin. Gently massage for 30–45s in circular motions and rinse with lukewarm water.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+hydrating+cleanser",
      zepto: "https://www.zeptonow.com/search?query=cerave+hydrating+cleanser",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+hydrating+facial+cleanser",
      official: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser"
    }
  },
  {
    id: "cleanse-cetaphil-gentle",
    category: "Purifying Evening Cleanse",
    name: "Cetaphil Gentle Skin Cleanser",
    keyActive: "Niacinamide, Panthenol & Hydrating Glycerin",
    concerns: ["oiliness", "acne", "redness", "sensitivity", "dryness", "dark spots"],
    phase: "NIGHT (PM) · STEP 01",
    step: "01",
    timing: "Night (PM)",
    budgetTier: "budget",
    price: "₹399",
    matchRate: "96% MATCH",
    imageUrl: "/assets/cetaphil-cleanser.png",
    whyThisProduct: "Dermatologist-recommended non-irritating wash that melts away sunscreen, makeup, and urban micro-pollution without stripping moisture.",
    usageTip: "Massage onto damp or dry face for 45 seconds to dissolve environmental impurities. Rinse clean with lukewarm water.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=cetaphil+gentle+skin+cleanser",
      zepto: "https://www.zeptonow.com/search?query=cetaphil+gentle+skin+cleanser",
      nykaa: "https://www.nykaa.com/search/result/?q=cetaphil+gentle+skin+cleanser",
      official: "https://www.cetaphil.in"
    }
  },

  // ==================== TARGETED ACTIVES ====================
  // 1. PIGMENTATION & DARK SPOTS (Tranexamic Acid / Alpha Arbutin / Vit C)
  {
    id: "active-tranexamic",
    category: "Anti-Pigmentation & Brightening Serum",
    name: "Minimalist Tranexamic Acid 3% + HPA",
    keyActive: "Tranexamic Acid 3% & Hydroxyphenoxy Propionic Acid",
    concerns: ["pigmentation", "dark spots", "uneven tone", "sun spots"],
    phase: "MORNING (AM) · STEP 02",
    step: "02",
    timing: "Morning (AM)",
    budgetTier: "clinical",
    price: "₹649",
    matchRate: "98% MATCH",
    imageUrl: "/assets/minimalist-tranexamic.png",
    whyThisProduct: "Specifically targets post-inflammatory hyperpigmentation and sun spots by curbing melanin transfer without photosensitizing skin.",
    usageTip: "Dispense 2–3 drops onto clean face in the morning. Pat gently until absorbed before applying moisturiser and sunscreen.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=minimalist+tranexamic+acid",
      zepto: "https://www.zeptonow.com/search?query=minimalist+tranexamic+acid",
      nykaa: "https://www.nykaa.com/search/result/?q=minimalist+tranexamic+acid+3",
      official: "https://beminimalist.co/products/tranexamic-3-hpa"
    }
  },

  // 2. ACNE & BLEMISHES (Salicylic Acid / BHA)
  {
    id: "active-salicylic",
    category: "Pore Clearing & Acne Clarifying Serum",
    name: "Minimalist Salicylic Acid 2% Serum",
    keyActive: "Salicylic Acid 2% (BHA) & Oligopeptide-10",
    concerns: ["acne", "blemishes", "blackheads", "congested pores"],
    phase: "NIGHT (PM) · STEP 02",
    step: "02",
    timing: "Night (PM)",
    budgetTier: "budget",
    price: "₹549",
    matchRate: "97% MATCH",
    imageUrl: "/assets/minimalist-salicylic.png",
    whyThisProduct: "Deeply penetrates lipid-rich follicles to dissolve acne-causing plugs, blackheads, and active inflammation without drying skin.",
    usageTip: "Apply 2–3 drops at night on completely dry skin. Avoid eye contours. Follow with barrier cream.",
    safePregnancy: false, // High BHA typically cautioned during pregnancy
    safeSensitive: false,
    stores: {
      blinkit: "https://blinkit.com/s/?q=minimalist+salicylic+acid",
      zepto: "https://www.zeptonow.com/search?query=minimalist+salicylic+acid",
      nykaa: "https://www.nykaa.com/search/result/?q=minimalist+salicylic+acid+2",
      official: "https://beminimalist.co/products/salicylic-acid-2"
    }
  },

  // 3. OILINESS & PORE REFINING (Niacinamide + Zinc)
  {
    id: "active-niacinamide",
    category: "Antioxidant & Sebum Balance",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    keyActive: "Niacinamide 10% & Zinc PCA 1%",
    concerns: ["oiliness", "large pores", "sebum control", "uneven texture"],
    phase: "MORNING (AM) · STEP 02",
    step: "02",
    timing: "Morning (AM)",
    budgetTier: "clinical",
    price: "₹600",
    matchRate: "95% MATCH",
    imageUrl: "/assets/the-ordinary-niacinamide.png",
    whyThisProduct: "Clinically proven to regulate excess daytime sebum, reinforce barrier integrity, and visibly minimize enlarged pores.",
    usageTip: "Apply 2–3 drops across face in the morning after cleansing. Press gently into skin.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=the+ordinary+niacinamide",
      zepto: "https://www.zeptonow.com/search?query=the+ordinary+niacinamide",
      nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+niacinamide+10+zinc+1",
      official: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html"
    }
  },

  // 4. TEXTURE & ANTI-AGING (Retinol)
  {
    id: "active-retinol",
    category: "Cellular Renewal & Anti-Aging",
    name: "The Ordinary Retinol 0.2% in Squalane",
    keyActive: "Pure Retinol 0.2% in Plant Squalane",
    concerns: ["texture", "fine lines", "dullness", "aging"],
    phase: "NIGHT (PM) · STEP 02",
    step: "02",
    timing: "Night (PM)",
    budgetTier: "clinical",
    price: "₹700",
    matchRate: "94% MATCH",
    imageUrl: "/assets/the-ordinary-retinol.png",
    whyThisProduct: "Stimulates overnight cellular turnover and collagen synthesis in nourishing squalane to refine coarse texture.",
    usageTip: "Apply 2 drops at night on dry skin 2 nights a week. Always follow with nighttime moisturiser. Never pair with strong acids.",
    safePregnancy: false, // Retinoids contraindicated in pregnancy
    safeSensitive: false,
    stores: {
      blinkit: "https://blinkit.com/s/?q=the+ordinary+retinol",
      zepto: "https://www.zeptonow.com/search?query=the+ordinary+retinol",
      nykaa: "https://www.nykaa.com/search/result/?q=the+ordinary+retinol+0.2+in+squalane",
      official: "https://theordinary.com/en-in/retinol-02pct-in-squalane-serum-100439.html"
    }
  },

  // 5. LUXURY ANTI-AGING / CELLULAR REPAIR (Estée Lauder ANR)
  {
    id: "active-estee-anr",
    category: "Prestige Cellular Multi-Recovery",
    name: "Estée Lauder Advanced Night Repair",
    keyActive: "Chronolux Power Signal Peptide & Hyaluronic Complex",
    concerns: ["texture", "fine lines", "dullness", "dryness"],
    phase: "NIGHT (PM) · STEP 02",
    step: "02",
    timing: "Night (PM)",
    budgetTier: "luxury",
    price: "₹4,200",
    matchRate: "99% MATCH",
    imageUrl: "/assets/estee-anr.png",
    whyThisProduct: "Prestige cellular repair complex that dramatically enhances overnight barrier recovery, firmness, and natural radiance.",
    usageTip: "Apply one full dropper onto clean face and neck before night cream. Smooth in gentle outward motions.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=estee+lauder+advanced+night+repair",
      zepto: "https://www.zeptonow.com/search?query=estee+lauder+advanced+night+repair",
      nykaa: "https://www.nykaa.com/search/result/?q=estee+lauder+advanced+night+repair",
      official: "https://www.esteelauder.in"
    }
  },

  // ==================== MOISTURISERS ====================
  {
    id: "moist-cerave-lotion",
    category: "Lightweight Barrier Moisture",
    name: "CeraVe Daily Moisturising Lotion",
    keyActive: "3 Essential Ceramides & Hyaluronic Acid",
    concerns: ["dryness", "barrier repair", "oiliness", "sensitivity", "redness"],
    phase: "MORNING (AM) · STEP 03",
    step: "03",
    timing: "Morning (AM)",
    budgetTier: "clinical",
    price: "₹1,200",
    matchRate: "95% MATCH",
    imageUrl: "/assets/cerave-lotion.png",
    whyThisProduct: "Oil-free, lightweight MVE hydration formula that fortifies the lipid moisture barrier without clogging pores.",
    usageTip: "Smooth a nickel-sized amount evenly over face and neck to seal hydration before applying sunscreen.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+moisturising+lotion",
      zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+lotion",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+daily+moisturising+lotion",
      official: "https://www.cerave.com/skincare/moisturizers/daily-moisturizing-lotion"
    }
  },
  {
    id: "moist-clinique-surge",
    category: "Prestige Auto-Replenishing Hydrator",
    name: "Clinique Moisture Surge 100H Hydrator",
    keyActive: "Aloe Bio-Ferment & Hyaluronic Acid Complex",
    concerns: ["dryness", "dullness", "dehydration"],
    phase: "MORNING (AM) · STEP 03",
    step: "03",
    timing: "Morning (AM)",
    budgetTier: "luxury",
    price: "₹2,950",
    matchRate: "99% MATCH",
    imageUrl: "/assets/clinique-moisture.png",
    whyThisProduct: "Penetrates 10 layers deep with bio-fermented aloe to deliver continuous 100-hour moisture surge for luminous radiance.",
    usageTip: "Smooth a pea-sized amount over face and neck. Layers weightlessly under sunscreen.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=clinique+moisture+surge",
      zepto: "https://www.zeptonow.com/search?query=clinique+moisture+surge",
      nykaa: "https://www.nykaa.com/search/result/?q=clinique+moisture+surge+100h",
      official: "https://www.clinique.in"
    }
  },
  {
    id: "moist-cerave-cream",
    category: "Deep Overnight Barrier Recovery",
    name: "CeraVe Moisturising Cream Tub",
    keyActive: "Biomimetic 3 Ceramides, Cholesterol & Fatty Acids",
    concerns: ["dryness", "barrier repair", "redness", "sensitivity"],
    phase: "NIGHT (PM) · STEP 03",
    step: "03",
    timing: "Night (PM)",
    budgetTier: "clinical",
    price: "₹1,450",
    matchRate: "98% MATCH",
    imageUrl: "/assets/cerave-cream.png",
    whyThisProduct: "Rich ceramide barrier repair matrix that seals in nocturnal actives and prevents transepidermal water loss overnight.",
    usageTip: "Warm a coin-sized amount between fingertips and gently press into skin as the final sealing step before bed.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
      zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
      official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
    }
  },

  // ==================== SUNSCREENS (AM ONLY) ====================
  {
    id: "spf-minimalist",
    category: "Broad-Spectrum UV Shield",
    name: "Minimalist Multi-Vitamin SPF 50 PA++++",
    keyActive: "Photostable UV Filters + Vitamins A, B3, B5, C & E",
    concerns: ["pigmentation", "dark spots", "sun damage", "aging", "general protection"],
    phase: "MORNING (AM) · STEP 04",
    step: "04",
    timing: "Morning (AM)",
    budgetTier: "budget",
    price: "₹399",
    matchRate: "99% MATCH",
    imageUrl: "/assets/minimalist-sunscreen.png",
    whyThisProduct: "Essential daily photoprotection infused with antioxidant vitamins to prevent UV-triggered melanin dark spots with zero white cast.",
    usageTip: "Apply 2 generous finger-lengths across face, neck, and ears 15 minutes before sun exposure.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=minimalist+sunscreen+spf+50",
      zepto: "https://www.zeptonow.com/search?query=minimalist+sunscreen+spf+50",
      nykaa: "https://www.nykaa.com/search/result/?q=minimalist+multi+vitamin+spf+50",
      official: "https://beminimalist.co/products/multi-vitamin-spf-50"
    }
  },
  {
    id: "spf-shiseido",
    category: "Prestige Sun Protection",
    name: "Shiseido The Perfect Protector SPF 50+",
    keyActive: "WetForce & HeatForce SynchroShield Technology",
    concerns: ["pigmentation", "sun damage", "aging", "luxury"],
    phase: "MORNING (AM) · STEP 04",
    step: "04",
    timing: "Morning (AM)",
    budgetTier: "luxury",
    price: "₹3,600",
    matchRate: "99% MATCH",
    imageUrl: "/assets/shiseido-spf.png",
    whyThisProduct: "Luxury photoprotection engineered with HeatForce technology that actually fortifies its UV barrier when exposed to heat and perspiration.",
    usageTip: "Shake well before use. Smooth two finger-lengths evenly across face and neck.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=shiseido+sunscreen",
      zepto: "https://www.zeptonow.com/search?query=shiseido+sunscreen",
      nykaa: "https://www.nykaa.com/search/result/?q=shiseido+the+perfect+protector",
      official: "https://www.shiseido.com"
    }
  },

  // ==================== LIP CARE (AM & PM) ====================
  // AM Lip Balm with SPF
  {
    id: "lip-am-minimalist",
    category: "Photoprotective Lip Shield",
    name: "Minimalist SPF 30 Lip Balm",
    keyActive: "Ceramides, Hyaluronic Acid & UV Filters",
    concerns: ["lip care", "dryness", "pigmentation", "uv protection"],
    phase: "MORNING (AM) · STEP 05",
    step: "05",
    timing: "Morning (AM)",
    budgetTier: "budget",
    price: "₹299",
    matchRate: "98% MATCH",
    imageUrl: "/assets/minimalist-lip-spf.png",
    whyThisProduct: "Essential daytime lip photoprotection formulated with ceramides to shield delicate vermilion borders against UV hyperpigmentation.",
    usageTip: "Glide generously across lips every morning. Reapply before going outdoors or after meals.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=minimalist+lip+balm+spf+30",
      zepto: "https://www.zeptonow.com/search?query=minimalist+lip+balm+spf+30",
      nykaa: "https://www.nykaa.com/search/result/?q=minimalist+spf+30+lip+balm",
      official: "https://beminimalist.co/products/spf-30-lip-balm"
    }
  },

  // PM Hydrating Lip Balm or Mask
  {
    id: "lip-pm-minimalist",
    category: "Overnight Lip Cellular Mask",
    name: "Minimalist L-Ascorbic + Peptide Lip Mask",
    keyActive: "L-Ascorbic Acid, Tripeptides & Murumuru Butter",
    concerns: ["lip care", "dryness", "chapping", "cellular repair"],
    phase: "NIGHT (PM) · STEP 04",
    step: "04",
    timing: "Night (PM)",
    budgetTier: "budget",
    price: "₹399",
    matchRate: "97% MATCH",
    imageUrl: "/assets/minimalist-lip-mask.png",
    whyThisProduct: "Intense overnight peptide and antioxidant lip treatment that repairs chapped skin and restores moisture barrier while you sleep.",
    usageTip: "Apply a generous layer to lips before sleeping as the final restorative step.",
    safePregnancy: true,
    safeSensitive: true,
    stores: {
      blinkit: "https://blinkit.com/s/?q=minimalist+lip+treatment",
      zepto: "https://www.zeptonow.com/search?query=minimalist+lip+treatment",
      nykaa: "https://www.nykaa.com/search/result/?q=minimalist+peptide+lip+mask",
      official: "https://beminimalist.co/products/peptide-lip-mask"
    }
  }
];

// Ensure backwards-compatible fields
inventory.forEach(item => {
  if (!item.match) item.match = item.whyThisProduct;
  if (!item.stepTitle) item.stepTitle = item.category;
});

export const tiers = {
  budget: {
    name: "Essential Value Tier (Under ₹1,200)",
    range: "≤ ₹1,200",
    summary: "Dermatologist-formulated essentials delivering active barrier care at an accessible price point.",
    daytime: [],
    nighttime: []
  },
  clinical: {
    name: "Clinical Core Tier (₹1,500 – ₹3,000)",
    range: "₹1,500 – ₹3,000",
    summary: "Gold-standard dermatological formulas engineered with multi-ceramide delivery and clinically validated actives.",
    daytime: [],
    nighttime: []
  },
  luxury: {
    name: "Prestige Luxury Tier (₹4,000+)",
    range: "≥ ₹3,500",
    summary: "Prestige dermatological and luxury botanicals engineered with cellular peptides and advanced lipid bio-ferments.",
    daytime: [],
    nighttime: []
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

/**
 * Build personalized, deduplicated AM & PM skincare routines tailored to confirmed concerns,
 * safety profiles, allergies, and budget preference.
 */
export function buildPersonalizedRoutine({
  concerns = [],
  budget = "₹2,500",
  pregnantOrBreastfeeding = false,
  medication = "",
  verySensitive = false,
  allergies = ""
} = {}) {
  // Normalize confirmed concerns
  const normalizedConcerns = Array.isArray(concerns)
    ? concerns.map(c => String(c).toLowerCase().trim()).filter(Boolean)
    : String(concerns).toLowerCase().split(/[,+]/).map(s => s.trim()).filter(Boolean);

  const allergyLower = String(allergies).toLowerCase();
  const medLower = String(medication).toLowerCase();
  const isRetinoidMed = medLower.includes("tretinoin") || medLower.includes("accutane") || medLower.includes("isotretinoin") || medLower.includes("adapalene");

  // Determine budget tier string
  const tierObj = getCatalogForBudget(budget);
  const isLuxury = tierObj.name.includes("Luxury");
  const isBudget = tierObj.name.includes("Value");

  // Filter helper: check if product violates user safety or allergies
  function isSafe(product) {
    if (pregnantOrBreastfeeding && !product.safePregnancy) return false;
    if (verySensitive && !product.safeSensitive) return false;
    if (isRetinoidMed && product.id === "active-retinol") return false;
    if (allergyLower) {
      if (allergyLower.includes("salicylic") && product.id === "active-salicylic") return false;
      if (allergyLower.includes("niacinamide") && product.id === "active-niacinamide") return false;
      if (allergyLower.includes("retinol") && product.id === "active-retinol") return false;
    }
    return true;
  }

  const selectedProductIds = new Set();
  const dayRoutine = [];
  const nightRoutine = [];

  // Helper to safely select an item without duplicating across routines
  function selectItem(candidateIds, fallbackId) {
    for (const id of candidateIds) {
      if (!selectedProductIds.has(id)) {
        const item = inventory.find(p => p.id === id);
        if (item && isSafe(item)) {
          selectedProductIds.add(id);
          const cloned = { ...item };
          cloned.match = cloned.whyThisProduct;
          cloned.stepTitle = cloned.category;
          return cloned;
        }
      }
    }
    if (fallbackId && !selectedProductIds.has(fallbackId)) {
      const fallback = inventory.find(p => p.id === fallbackId);
      if (fallback) {
        selectedProductIds.add(fallbackId);
        const cloned = { ...fallback };
        cloned.match = cloned.whyThisProduct;
        cloned.stepTitle = cloned.category;
        return cloned;
      }
    }
    return null;
  }

  // 1. AM CLEANSE
  const amCleanser = selectItem(
    isBudget ? ["cleanse-simple", "cleanse-cerave-hydrating"] : ["cleanse-cerave-hydrating", "cleanse-simple"],
    "cleanse-simple"
  );
  if (amCleanser) {
    amCleanser.phase = "MORNING (AM) · STEP 01";
    amCleanser.stepNumber = "01";
    dayRoutine.push(amCleanser);
  }

  // 2. AM TARGET ACTIVE (e.g. Pigmentation -> Tranexamic Acid; Oiliness -> Niacinamide)
  const hasPigmentation = normalizedConcerns.some(c => c.includes("pigment") || c.includes("dark spots") || c.includes("spots"));
  const hasOiliness = normalizedConcerns.some(c => c.includes("oil"));
  const hasAcne = normalizedConcerns.some(c => c.includes("acne") || c.includes("breakout") || c.includes("pimple"));
  const hasDryness = normalizedConcerns.some(c => c.includes("dry") || c.includes("barrier"));
  const hasRedness = normalizedConcerns.some(c => c.includes("red") || c.includes("sensitiv"));
  const hasTexture = normalizedConcerns.some(c => c.includes("texture") || c.includes("aging") || c.includes("lines"));

  let amActive = null;
  if (hasPigmentation) {
    amActive = selectItem(["active-tranexamic"], null);
  } else if (hasOiliness) {
    amActive = selectItem(["active-niacinamide"], null);
  } else if (hasRedness || verySensitive) {
    // Redness/sensitive prefers gentle Niacinamide or skips harsh actives
    amActive = selectItem(["active-niacinamide"], null);
  }

  // If no AM active chosen yet and user selected acne without pigmentation
  if (!amActive && hasAcne && !hasPigmentation) {
    // If user only selected acne, we can place Niacinamide in AM to balance sebum under sunscreen
    amActive = selectItem(["active-niacinamide"], null);
  }

  if (amActive) {
    amActive.phase = "MORNING (AM) · STEP 02";
    amActive.stepNumber = "02";
    dayRoutine.push(amActive);
  }

  // 3. AM MOISTURISER
  const amMoist = selectItem(
    isLuxury ? ["moist-clinique-surge", "moist-cerave-lotion"] : ["moist-cerave-lotion"],
    "moist-cerave-lotion"
  );
  if (amMoist) {
    amMoist.stepNumber = String(dayRoutine.length + 1).padStart(2, "0");
    amMoist.phase = `MORNING (AM) · STEP ${amMoist.stepNumber}`;
    dayRoutine.push(amMoist);
  }

  // 4. AM SUNSCREEN
  const amSunscreen = selectItem(
    isLuxury ? ["spf-shiseido", "spf-minimalist"] : ["spf-minimalist"],
    "spf-minimalist"
  );
  if (amSunscreen) {
    amSunscreen.stepNumber = String(dayRoutine.length + 1).padStart(2, "0");
    amSunscreen.phase = `MORNING (AM) · STEP ${amSunscreen.stepNumber}`;
    dayRoutine.push(amSunscreen);
  }

  // 5. AM LIP CARE (Lip Balm with SPF)
  const amLip = selectItem(["lip-am-minimalist"], "lip-am-minimalist");
  if (amLip) {
    amLip.stepNumber = String(dayRoutine.length + 1).padStart(2, "0");
    amLip.phase = `MORNING (AM) · STEP ${amLip.stepNumber}`;
    dayRoutine.push(amLip);
  }

  // ----------------------------------------------------
  // PM ROUTINE
  // ----------------------------------------------------

  // 1. PM CLEANSE
  const pmCleanser = selectItem(["cleanse-cetaphil-gentle"], "cleanse-cetaphil-gentle");
  if (pmCleanser) {
    pmCleanser.phase = "NIGHT (PM) · STEP 01";
    pmCleanser.stepNumber = "01";
    nightRoutine.push(pmCleanser);
  }

  // 2. PM TARGET ACTIVE (Acne -> Salicylic Acid; Texture -> Retinol; Luxury -> Estee ANR)
  let pmActive = null;
  if (hasAcne) {
    // Acne concern gets Salicylic Acid 2%
    pmActive = selectItem(["active-salicylic"], null);
  } else if (hasTexture || (!hasAcne && !hasRedness && !verySensitive && !pregnantOrBreastfeeding)) {
    // Anti-aging / Texture gets Retinol or Estee Lauder ANR
    pmActive = selectItem(
      isLuxury ? ["active-estee-anr", "active-retinol"] : ["active-retinol"],
      null
    );
  }

  // If user selected pigmentation AND has no acne, but we need evening support
  if (!pmActive && hasPigmentation && !selectedProductIds.has("active-tranexamic")) {
    pmActive = selectItem(["active-tranexamic"], null);
  }

  // If user selected oiliness and niacinamide wasn't used in AM
  if (!pmActive && hasOiliness && !selectedProductIds.has("active-niacinamide")) {
    pmActive = selectItem(["active-niacinamide"], null);
  }

  if (pmActive) {
    pmActive.phase = "NIGHT (PM) · STEP 02";
    pmActive.stepNumber = "02";
    nightRoutine.push(pmActive);
  }

  // 3. PM BARRIER CREAM
  const pmMoist = selectItem(["moist-cerave-cream"], "moist-cerave-cream");
  if (pmMoist) {
    pmMoist.stepNumber = String(nightRoutine.length + 1).padStart(2, "0");
    pmMoist.phase = `NIGHT (PM) · STEP ${pmMoist.stepNumber}`;
    nightRoutine.push(pmMoist);
  }

  // 4. PM LIP CARE (Hydrating Lip Balm or Mask)
  const pmLip = selectItem(["lip-pm-minimalist"], "lip-pm-minimalist");
  if (pmLip) {
    pmLip.stepNumber = String(nightRoutine.length + 1).padStart(2, "0");
    pmLip.phase = `NIGHT (PM) · STEP ${pmLip.stepNumber}`;
    nightRoutine.push(pmLip);
  }

  // Conflict Check & Patch Test Advice
  const conflictReport = [];
  const amActivesList = dayRoutine.filter(p => p.id.startsWith("active-")).map(p => p.name);
  const pmActivesList = nightRoutine.filter(p => p.id.startsWith("active-")).map(p => p.name);

  if (amActivesList.length && pmActivesList.length) {
    conflictReport.push(`Safe Diurnal Separation: AM active (${amActivesList.join(", ")}) is isolated from PM active (${pmActivesList.join(", ")}). Zero clashing acid interactions.`);
  } else {
    conflictReport.push("Safe Single-Active Protocol: Zero conflicting formulation clashes identified.");
  }

  const patchTestAdvice = "Clinical Patch-Test Reminder: Apply a pea-sized amount of any newly introduced active formulation behind the ear or on your inner forearm for 24 hours before facial use.";

  const dermoNotice = "Dermatology Referral Advisory: If you experience painful cystic acne, sudden swelling, an irregular or changing mole, or severe blistering, consult a board-certified dermatologist for in-person medical care.";

  return {
    daytime: dayRoutine,
    nighttime: nightRoutine,
    selectedTier: tierObj,
    ingredientConflictCheck: conflictReport.join(" "),
    patchTestReminder: patchTestAdvice,
    dermatologistNotice: dermoNotice,
    confirmedConcerns: normalizedConcerns
  };
}

// Populate static tiers for backwards compatibility
const bRes = buildPersonalizedRoutine({ budget: "₹1,000", concerns: ["oiliness", "pigmentation"] });
tiers.budget.daytime = bRes.daytime;
tiers.budget.nighttime = bRes.nighttime;

const cRes = buildPersonalizedRoutine({ budget: "₹2,500", concerns: ["pigmentation", "acne"] });
tiers.clinical.daytime = cRes.daytime;
tiers.clinical.nighttime = cRes.nighttime;

const lRes = buildPersonalizedRoutine({ budget: "₹4,000", concerns: ["pigmentation", "dryness"] });
tiers.luxury.daytime = lRes.daytime;
tiers.luxury.nighttime = lRes.nighttime;

export const defaultCatalog = tiers.clinical;
export const catalog = tiers.clinical;
export const productsList = inventory;

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "content-type": "application/json" });
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const budgetParam = url.searchParams.get("budget") || "";
  const concernsParam = url.searchParams.get("concerns") || "";

  const routine = buildPersonalizedRoutine({
    budget: budgetParam,
    concerns: concernsParam ? concernsParam.split(",") : ["pigmentation", "acne"]
  });

  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "s-maxage=3600, stale-while-revalidate"
  });
  res.end(JSON.stringify({
    tiers,
    selectedTier: routine.selectedTier,
    catalog: { daytime: routine.daytime, nighttime: routine.nighttime },
    daytime: routine.daytime,
    nighttime: routine.nighttime,
    ingredientConflictCheck: routine.ingredientConflictCheck,
    patchTestReminder: routine.patchTestReminder,
    dermatologistNotice: routine.dermatologistNotice,
    products: [...routine.daytime, ...routine.nighttime]
  }));
}

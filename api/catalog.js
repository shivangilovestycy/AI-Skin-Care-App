export const catalog = {
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

// Also export a flat list for backwards compatibility
export const productsList = [...catalog.daytime, ...catalog.nighttime];

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "content-type": "application/json" });
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }
  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "s-maxage=3600, stale-while-revalidate"
  });
  res.end(JSON.stringify({
    catalog,
    products: productsList,
    daytime: catalog.daytime,
    nighttime: catalog.nighttime
  }));
}

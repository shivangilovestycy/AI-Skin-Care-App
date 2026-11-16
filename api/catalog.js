export const catalog = [
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

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.writeHead(405, { "content-type": "application/json" });
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }
  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "s-maxage=3600, stale-while-revalidate"
  });
  res.end(JSON.stringify({ products: catalog }));
}

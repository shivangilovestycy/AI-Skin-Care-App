export const catalog = [
  { id: "cleanser-01", category: "Cleanser", name: "CeraVe Hydrating Facial Cleanser", match: "A gentle everyday cleanse", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser", imageUrl: "" },
  { id: "serum-01", category: "Serum", name: "The Ordinary Niacinamide 10% + Zinc 1%", match: "For a simple oil-control routine", retailer: "Official DECIEM", url: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html", imageUrl: "" },
  { id: "moisturiser-01", category: "Moisturiser", name: "CeraVe Moisturising Cream", match: "Barrier-supporting moisture", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream", imageUrl: "" },
  { id: "sunscreen-01", category: "Sunscreen", name: "La Roche-Posay Anthelios UVMune 400", match: "Daily broad-spectrum protection", retailer: "Official La Roche-Posay", url: "https://www.laroche-posay.co.uk/en_GB/anthelios-uvmune-400-invisible-fluid-spf50-plus/3337875797597.html", imageUrl: "" }
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

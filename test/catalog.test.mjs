import assert from "node:assert";

const requiredFields = ["id", "category", "name", "match", "retailer", "url"];
const catalog = [
  { id: "cleanser-01", category: "Cleanser", name: "CeraVe Hydrating Facial Cleanser", match: "A gentle everyday cleanse", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser", imageUrl: "" },
  { id: "serum-01", category: "Serum", name: "The Ordinary Niacinamide 10% + Zinc 1%", match: "For a simple oil-control routine", retailer: "Official DECIEM", url: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html", imageUrl: "" },
  { id: "moisturiser-01", category: "Moisturiser", name: "CeraVe Moisturising Cream", match: "Barrier-supporting moisture", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream", imageUrl: "" },
  { id: "sunscreen-01", category: "Sunscreen", name: "La Roche-Posay Anthelios UVMune 400", match: "Daily broad-spectrum protection", retailer: "Official La Roche-Posay", url: "https://www.laroche-posay.co.uk/en_GB/anthelios-uvmune-400-invisible-fluid-spf50-plus/3337875797597.html", imageUrl: "" }
];

assert(catalog.length === 4, "Catalog must contain 4 verified items");
catalog.forEach((item) => {
  requiredFields.forEach((field) => {
    assert(field in item, `Missing field: ${field}`);
  });
  assert(item.url.startsWith("https://"), "URL must be HTTPS official retailer link");
});

console.log("✓ Catalog schema tests passed");

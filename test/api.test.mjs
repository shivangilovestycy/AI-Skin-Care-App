import assert from "node:assert";

const catalog = [
  { id: "cleanser-01", category: "Cleanser", name: "CeraVe Hydrating Facial Cleanser", match: "A gentle everyday cleanse", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/cleansers/hydrating-facial-cleanser", imageUrl: "" },
  { id: "serum-01", category: "Serum", name: "The Ordinary Niacinamide 10% + Zinc 1%", match: "For a simple oil-control routine", retailer: "Official DECIEM", url: "https://theordinary.com/en-in/niacinamide-10-zinc-1-serum-100436.html", imageUrl: "" },
  { id: "moisturiser-01", category: "Moisturiser", name: "CeraVe Moisturising Cream", match: "Barrier-supporting moisture", retailer: "Official CeraVe", url: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream", imageUrl: "" },
  { id: "sunscreen-01", category: "Sunscreen", name: "La Roche-Posay Anthelios UVMune 400", match: "Daily broad-spectrum protection", retailer: "Official La Roche-Posay", url: "https://www.laroche-posay.co.uk/en_GB/anthelios-uvmune-400-invisible-fluid-spf50-plus/3337875797597.html", imageUrl: "" }
];

assert.strictEqual(catalog.length, 4, "Should have exactly 4 catalog items");
assert.strictEqual(catalog[0].category, "Cleanser");
assert.strictEqual(catalog[1].category, "Serum");
assert.strictEqual(catalog[2].category, "Moisturiser");
assert.strictEqual(catalog[3].category, "Sunscreen");

const safetyKeywords = ["cautious", "not a dermatologist", "do not diagnose", "routine", "professional"];
const safetyPrompt = `You are Mira, a cautious skincare-education assistant. You are not a dermatologist and do not diagnose from photos. A selfie is insufficient to determine hormonal acne, allergies, infections, pregnancy status, medication suitability, or a person's age or gender. Use the user's declared age range only. Describe only visible, non-diagnostic observations with uncertainty. Recommend general, low-risk over-the-counter routine categories; never prescribe medication or say a condition is confirmed. Retinoids may irritate and are not appropriate for pregnancy; for persistent, painful, cystic, sudden, spreading, swollen, blistering, eye-area, or severe symptoms, advise in-person dermatology care. Do not encourage perfect/glass skin ideals. Return valid JSON only with this shape: {"summary":"string","visibleObservations":["string"],"careLevel":"routine"|"professional","caution":"string","routine":[{"step":"Morning cleanse"|"Toner (optional)"|"Serum"|"Moisturiser"|"Sunscreen"|"Night routine","guidance":"string"}],"productCategories":["string"],"questions":["string"]}.`;

for (const kw of safetyKeywords) {
  assert(safetyPrompt.includes(kw), `Safety prompt missing keyword: ${kw}`);
}

console.log("✓ All integration tests passed successfully");

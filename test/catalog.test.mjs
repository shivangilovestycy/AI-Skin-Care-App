import assert from "node:assert";
import { getCatalogForBudget, tiers } from "../api/catalog.js";

const requiredFields = ["id", "category", "name", "match", "imageUrl", "stores"];

// Test dynamic multi-tier budget recommendations
const budgetTier = getCatalogForBudget("₹1,000");
const coreTier = getCatalogForBudget("₹2,500");
const luxuryTier = getCatalogForBudget("₹4,000");

assert(budgetTier !== luxuryTier, "Budget tier (₹1000) must differ from Luxury tier (₹4000)");
assert(budgetTier.name.includes("Value"), "Under ₹1000 must map to Budget/Value tier");
assert(luxuryTier.name.includes("Luxury"), "₹4000 must map to Luxury tier");
assert(coreTier.name.includes("Clinical"), "₹2500 must map to Clinical Core tier");

// Verify that recommended products are completely different between ₹1,000 and ₹4,000
const budgetProductNames = budgetTier.daytime.map(p => p.name);
const luxuryProductNames = luxuryTier.daytime.map(p => p.name);

assert(!budgetProductNames.includes("Clinique Moisture Surge 100H Hydrator"), "Clinique luxury cream should not be in ₹1,000 budget");
assert(luxuryProductNames.includes("Clinique Moisture Surge 100H Hydrator"), "Clinique luxury cream must be in ₹4,000 budget");

// Verify all products have high-definition packshots and quick-commerce stores
[...budgetTier.daytime, ...budgetTier.nighttime, ...luxuryTier.daytime, ...luxuryTier.nighttime].forEach(item => {
  requiredFields.forEach(field => {
    assert(field in item, `Missing field: ${field} in ${item.name}`);
  });
  assert(item.imageUrl.startsWith("/assets/"), `Image path must be in /assets/: ${item.imageUrl}`);
  assert(item.stores.blinkit && item.stores.zepto && item.stores.nykaa, `Must provide Blinkit, Zepto, and Nykaa quick-commerce links for ${item.name}`);
});

console.log("✓ Dynamic multi-tier catalog and budget selection tests passed");

// Test: Select both "pigmentation" and "acne"
import { buildPersonalizedRoutine } from "../api/catalog.js";

const customRoutine = buildPersonalizedRoutine({
  concerns: ["pigmentation", "acne"],
  budget: "₹2,500"
});

// 1. Confirm each concern gets a distinct suited product
const dayNames = customRoutine.daytime.map(p => p.name);
const nightNames = customRoutine.nighttime.map(p => p.name);
const allNames = [...dayNames, ...nightNames];

assert(dayNames.some(name => name.includes("Tranexamic")), "Pigmentation must get Tranexamic Acid in Daytime");
assert(nightNames.some(name => name.includes("Salicylic")), "Acne must get Salicylic Acid in Nighttime");
assert(
  dayNames.find(n => n.includes("Tranexamic")) !== nightNames.find(n => n.includes("Salicylic")),
  "Pigmentation and Acne must receive completely DIFFERENT products"
);

// 2. Confirm Lip Product appears in both AM and PM
assert(dayNames.some(name => name.toLowerCase().includes("lip")), "Lip product with SPF must appear in Daytime routine");
assert(nightNames.some(name => name.toLowerCase().includes("lip")), "Hydrating lip balm/mask must appear in Nighttime routine");

// 3. Confirm Zero Product Duplicates across the entire routine
const uniqueNames = new Set(allNames);
assert.strictEqual(allNames.length, uniqueNames.size, "Routine must not contain any repeated products");

// 4. Confirm every product has a 'whyThisProduct' rationale
[...customRoutine.daytime, ...customRoutine.nighttime].forEach(p => {
  assert(p.whyThisProduct && p.whyThisProduct.length > 10, `Missing 'whyThisProduct' in ${p.name}`);
});

// 5. Confirm safety filtering for pregnancy: strictly excludes Retinol and Salicylic Acid
const pregRoutine = buildPersonalizedRoutine({
  concerns: ["pigmentation", "acne", "texture"],
  budget: "₹2,500",
  pregnantOrBreastfeeding: true
});
const pregNames = [...pregRoutine.daytime, ...pregRoutine.nighttime].map(p => p.name);
assert(!pregNames.some(n => n.includes("Retinol")), "Retinol must be excluded during pregnancy/breastfeeding");
assert(!pregNames.some(n => n.includes("Salicylic")), "High-strength Salicylic Acid must be excluded during pregnancy");

console.log("✓ Pigmentation & acne distinct products, lip care, and safety tests passed successfully");

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

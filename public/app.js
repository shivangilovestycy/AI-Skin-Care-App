const selfie = document.querySelector('#selfie');
const preview = document.querySelector('#preview');
const analyse = document.querySelector('#analyse');
const routine = document.querySelector('#routine');
const productGrid = document.querySelector('#product-grid');
const status = document.querySelector('#analysis-status');
let imageData = '';

selfie.addEventListener('change', () => {
  const file = selfie.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { imageData = reader.result; preview.innerHTML = `<img alt="Selected selfie preview" src="${imageData}">`; };
  reader.readAsDataURL(file);
});
function renderProducts(products) {
  productGrid.innerHTML = products.map(product => `<article class="product"><p class="product-type">${product.category}</p><div class="packshot">VERIFIED ASSET SLOT</div><h3>${product.name}</h3><p>${product.match}</p><a href="${product.url}" target="_blank" rel="noreferrer">${product.retailer} →</a></article>`).join('');
}
function renderRoutine(analysis) {
  routine.innerHTML = analysis.routine.map((item, i) => `<article class="routine-item"><span class="routine-no">0${i + 1}</span><h3>${item.step}</h3><p>${item.guidance}</p></article>`).join('');
}
async function loadCatalog() { const data = await fetch('/api/catalog').then(r => r.json()); renderProducts(data.products); }
analyse.addEventListener('click', async () => {
  status.textContent = 'Building your cautious routine…'; analyse.disabled = true;
  try {
    const response = await fetch('/api/analyze', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ imageData, ageRange: document.querySelector('#ageRange').value, goals: document.querySelector('#goals').value, sensitivities: document.querySelector('#sensitivities').value, budget: document.querySelector('#budget').value }) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error);
    renderRoutine(data.analysis); renderProducts(data.catalog); status.textContent = data.analysis.careLevel === 'professional' ? 'Professional care recommended — see the caution below' : data.analysis.summary;
    document.querySelector('#result').scrollIntoView({ behavior: 'smooth' });
  } catch (error) { status.textContent = error.message || 'Analysis could not be completed'; }
  finally { analyse.disabled = false; }
});
loadCatalog();

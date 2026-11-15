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

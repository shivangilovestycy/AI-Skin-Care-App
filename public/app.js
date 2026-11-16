/**
 * MIRA — SKIN INTELLIGENCE CLIENT LOGIC
 * High-performance, classy, dual AM/PM sequence, 3D rotating showcase, and quick-commerce integrations.
 */

// DOM Elements: Camera & Input
const selfie = document.querySelector('#selfie');
const preview = document.querySelector('#preview');
const openCameraBtn = document.querySelector('#open-camera');
const capturePhotoBtn = document.querySelector('#capture-photo');
const retakePhotoBtn = document.querySelector('#retake-photo');
const cameraStreamEl = document.querySelector('#camera-stream');
const cameraCanvas = document.querySelector('#camera-canvas');
const previewPlaceholder = document.querySelector('#preview-placeholder');
const cameraStatus = document.querySelector('#camera-status');
const systemTime = document.querySelector('#system-time');

// DOM Elements: Intake & Analysis
const analyseBtn = document.querySelector('#analyse');
const ageRangeInput = document.querySelector('#ageRange');
const goalsInput = document.querySelector('#goals');
const sensitivitiesInput = document.querySelector('#sensitivities');
const budgetInput = document.querySelector('#budget');
const analysisStatus = document.querySelector('#analysis-status');

// DOM Elements: Showcase Card (Reference Image Match)
const showcaseView = document.querySelector('#showcase-view');
const stageProductImg = document.querySelector('#stage-product-img');
const stageCardCategory = document.querySelector('#stage-card-category');
const stageCardMatch = document.querySelector('#stage-card-match');
const heroProductSubtitle = document.querySelector('#hero-product-subtitle');
const btnHeroShop = document.querySelector('#btn-hero-shop');
const btnScanAgain = document.querySelector('#btn-scan-again');

// DOM Elements: Routine & Catalog
const dayRoutineGrid = document.querySelector('#day-routine-grid');
const nightRoutineGrid = document.querySelector('#night-routine-grid');
const routineTabsContainer = document.querySelector('#routine-tabs-container');
const dayPanel = document.querySelector('#day-routine-panel');
const nightPanel = document.querySelector('#night-routine-panel');
const productGrid = document.querySelector('#product-grid');

// DOM Elements: Store Modal
const storeModal = document.querySelector('#store-modal');
const modalCloseBtn = document.querySelector('#modal-close');
const modalProductImg = document.querySelector('#modal-product-img');
const modalProductCategory = document.querySelector('#modal-product-category');
const modalProductTitle = document.querySelector('#modal-product-title');
const modalProductPrice = document.querySelector('#modal-product-price');
const linkBlinkit = document.querySelector('#link-blinkit');
const linkZepto = document.querySelector('#link-zepto');
const linkNykaa = document.querySelector('#link-nykaa');
const linkOfficial = document.querySelector('#link-official');

let imageData = '';
let activeMediaStream = null;
let currentProducts = [];
let currentHeroProduct = null;

// Real-Time System Clock (07:40 style)
function updateSystemClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  if (systemTime) systemTime.textContent = `${hours}:${minutes}`;
}
setInterval(updateSystemClock, 1000);
updateSystemClock();

// Stop active camera stream
function stopCameraStream() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => track.stop());
    activeMediaStream = null;
  }
}

// Start device camera
async function startCamera() {
  stopCameraStream();
  cameraStatus.textContent = 'Activating device optical sensor…';

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraStatus.textContent = 'Camera API not supported in this browser environment. Please upload an image file.';
    return;
  }

  try {
    activeMediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    cameraStreamEl.srcObject = activeMediaStream;
    cameraStreamEl.style.display = 'block';
    if (previewPlaceholder) previewPlaceholder.style.display = 'none';

    // Remove any captured image
    const existingImg = preview.querySelector('img');
    if (existingImg) existingImg.remove();

    preview.classList.add('active');

    // Button states
    openCameraBtn.style.display = 'none';
    capturePhotoBtn.style.display = 'flex';
    retakePhotoBtn.style.display = 'none';

    cameraStatus.textContent = 'Scanner online. Center your face in the circular reticle and capture.';
  } catch (err) {
    console.error('Camera access error:', err);
    cameraStatus.textContent = 'Camera permission denied or camera unavailable. You can upload a photo instead.';
  }
}

// Capture photo from live camera feed
function capturePhoto() {
  if (!activeMediaStream || !cameraStreamEl.videoWidth) {
    cameraStatus.textContent = 'Initializing optical feed, please wait…';
    return;
  }

  const width = cameraStreamEl.videoWidth;
  const height = cameraStreamEl.videoHeight;
  cameraCanvas.width = width;
  cameraCanvas.height = height;

  const ctx = cameraCanvas.getContext('2d');
  // Mirror frame horizontally for natural selfie view
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(cameraStreamEl, 0, 0, width, height);

  imageData = cameraCanvas.toDataURL('image/jpeg', 0.92);

  // Stop camera tracks to save battery
  stopCameraStream();
  cameraStreamEl.style.display = 'none';

  // Display captured image
  let img = preview.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = 'Captured selfie';
    preview.appendChild(img);
  }
  img.src = imageData;
  img.style.display = 'block';
  preview.classList.add('active');

  // Update UI buttons
  capturePhotoBtn.style.display = 'none';
  retakePhotoBtn.style.display = 'flex';
  openCameraBtn.style.display = 'none';

  cameraStatus.textContent = 'Biometric input captured. Set your preferences below and build your protocol.';
  
  // Smooth scroll to intake
  const intakeSection = document.querySelector('#intake-section');
  if (intakeSection) intakeSection.scrollIntoView({ behavior: 'smooth' });
}

// Retake photo
function retakePhoto() {
  imageData = '';
  startCamera();
}

if (openCameraBtn) openCameraBtn.addEventListener('click', startCamera);
if (capturePhotoBtn) capturePhotoBtn.addEventListener('click', capturePhoto);
if (retakePhotoBtn) retakePhotoBtn.addEventListener('click', retakePhoto);

// File input fallback
if (selfie) {
  selfie.addEventListener('change', () => {
    const file = selfie.files?.[0];
    if (!file) return;

    stopCameraStream();
    cameraStreamEl.style.display = 'none';
    if (previewPlaceholder) previewPlaceholder.style.display = 'none';

    const reader = new FileReader();
    reader.onload = () => {
      imageData = reader.result;
      let img = preview.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        img.alt = 'Uploaded selfie';
        preview.appendChild(img);
      }
      img.src = imageData;
      img.style.display = 'block';
      preview.classList.add('active');

      openCameraBtn.style.display = 'none';
      capturePhotoBtn.style.display = 'none';
      retakePhotoBtn.style.display = 'flex';
      cameraStatus.textContent = 'Image loaded from device. Configure context preferences below.';
    };
    reader.readAsDataURL(file);
  });
}

// Tab Switching for Daytime vs Nighttime Routine
if (routineTabsContainer) {
  routineTabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const targetTab = btn.getAttribute('data-tab');

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (targetTab === 'day') {
      dayPanel.classList.add('active');
      nightPanel.classList.remove('active');
    } else {
      nightPanel.classList.add('active');
      dayPanel.classList.remove('active');
    }
  });
}

// Open Multi-Vendor Store Modal
function openStoreModal(product) {
  if (!product) return;
  modalProductImg.src = product.imageUrl || '/assets/mira-barrier-cream.png';
  modalProductCategory.textContent = product.category || 'SKINCARE';
  modalProductTitle.textContent = product.name;
  modalProductPrice.textContent = `${product.price || '₹1,200'} · ${product.matchRate || '96% Match'}`;

  // Build store links
  const query = encodeURIComponent(product.name.replace(/™|®/g, ''));
  const stores = product.stores || {};
  
  linkBlinkit.href = stores.blinkit || `https://blinkit.com/s/?q=${query}`;
  linkZepto.href = stores.zepto || `https://www.zeptonow.com/search?query=${query}`;
  linkNykaa.href = stores.nykaa || `https://www.nykaa.com/search/result/?q=${query}`;
  linkOfficial.href = stores.official || 'https://www.cerave.com';

  storeModal.style.display = 'flex';
}

function closeStoreModal() {
  storeModal.style.display = 'none';
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeStoreModal);
if (storeModal) {
  storeModal.addEventListener('click', (e) => {
    if (e.target === storeModal) closeStoreModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && storeModal.style.display === 'flex') {
    closeStoreModal();
  }
});

// Render Product Catalog
function renderProducts(products) {
  currentProducts = products;
  if (!productGrid) return;
  
  productGrid.innerHTML = products.map((product, idx) => `
    <article class="product-card">
      <div class="card-top-bar">
        <span class="p-category">${product.category}</span>
        <span class="p-match">${product.matchRate || '94% MATCH'}</span>
      </div>
      <div class="product-image-container">
        <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
      </div>
      <h3>${product.name}</h3>
      <p>${product.match}</p>
      <div class="product-card-bottom">
        <span class="p-price">${product.price}</span>
        <button type="button" class="btn-open-stores" data-idx="${idx}">
          <span>Shop Options</span> <span>→</span>
        </button>
      </div>
    </article>
  `).join('');

  // Wire up shop option buttons
  productGrid.querySelectorAll('.btn-open-stores').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      openStoreModal(currentProducts[idx]);
    });
  });
}

// Render Dual AM / PM Routines
function renderRoutineSequences(analysis) {
  const dayItems = analysis.dayRoutine || [];
  const nightItems = analysis.nightRoutine || [];

  if (dayRoutineGrid) {
    dayRoutineGrid.innerHTML = dayItems.map(item => `
      <article class="routine-step-card">
        <div class="routine-card-meta">
          <span class="step-tag">${item.stepNumber || 'AM'}</span>
          <span class="time-tag">MORNING (AM)</span>
        </div>
        <h3>${item.step}</h3>
        <p>${item.guidance}</p>
        <div class="routine-product-pick">
          <small>${item.recommendedProduct || item.category}</small>
          <button type="button" class="btn-card-shop" data-product="${item.recommendedProduct}">Shop →</button>
        </div>
      </article>
    `).join('');
  }

  if (nightRoutineGrid) {
    nightRoutineGrid.innerHTML = nightItems.map(item => `
      <article class="routine-step-card">
        <div class="routine-card-meta">
          <span class="step-tag">${item.stepNumber || 'PM'}</span>
          <span class="time-tag">EVENING (PM)</span>
        </div>
        <h3>${item.step}</h3>
        <p>${item.guidance}</p>
        <div class="routine-product-pick">
          <small>${item.recommendedProduct || item.category}</small>
          <button type="button" class="btn-card-shop" data-product="${item.recommendedProduct}">Shop →</button>
        </div>
      </article>
    `).join('');
  }

  // Wire up routine step shop buttons
  document.querySelectorAll('.btn-card-shop').forEach(btn => {
    btn.addEventListener('click', () => {
      const pName = btn.getAttribute('data-product');
      const matched = currentProducts.find(p => p.name.toLowerCase().includes(pName.toLowerCase())) || currentProducts[0];
      openStoreModal(matched);
    });
  });
}

// Update 3D Rotating Product Showcase
function updateHeroShowcase(heroProduct) {
  currentHeroProduct = heroProduct || currentProducts[0] || {
    name: "Mira Bio-Lipid Barrier Cream",
    category: "Barrier Cream",
    matchRate: "96% MATCH",
    price: "₹1,200",
    imageUrl: "/assets/mira-barrier-cream.png",
    stores: {
      blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
      zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
      nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
      official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
    }
  };

  if (stageProductImg) stageProductImg.src = currentHeroProduct.imageUrl;
  if (stageCardCategory) stageCardCategory.textContent = currentHeroProduct.category || "BARRIER CREAM";
  if (stageCardMatch) stageCardMatch.textContent = `${currentHeroProduct.matchRate || "96% MATCH"} · ${currentHeroProduct.price || "₹1,200"}`;
  if (heroProductSubtitle) heroProductSubtitle.textContent = currentHeroProduct.headline || "Chosen for your skin and your budget.";

  if (showcaseView) showcaseView.style.display = 'flex';
}

if (btnHeroShop) {
  btnHeroShop.addEventListener('click', () => {
    openStoreModal(currentHeroProduct);
  });
}

if (btnScanAgain) {
  btnScanAgain.addEventListener('click', () => {
    document.querySelector('#top').scrollIntoView({ behavior: 'smooth' });
    retakePhoto();
  });
}

// Load Catalog on page load
async function loadCatalog() {
  try {
    const res = await fetch('/api/catalog');
    const data = await res.json();
    if (data.products && data.products.length > 0) {
      renderProducts(data.products);
      updateHeroShowcase(data.products[0]);
    }
  } catch (err) {
    console.warn('Initial catalog load notice:', err);
  }
}

// Build Routine Submission
if (analyseBtn) {
  analyseBtn.addEventListener('click', async () => {
    analysisStatus.textContent = 'Synthesizing dual-sequence protocol…';
    analyseBtn.disabled = true;

    const payload = {
      imageData,
      ageRange: ageRangeInput.value,
      goals: goalsInput.value,
      sensitivities: sensitivitiesInput.value,
      budget: budgetInput.value
    };

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Protocol generation error');

      if (data.catalog) renderProducts(data.catalog);
      if (data.analysis) {
        renderRoutineSequences(data.analysis);
        updateHeroShowcase(data.analysis.heroProduct || currentProducts[0]);
        analysisStatus.textContent = data.analysis.careLevel === 'professional'
          ? 'Professional care recommended — see clinical boundary'
          : data.analysis.summary;
      }

      // Smooth scroll to 3D showcase
      if (showcaseView) {
        showcaseView.style.display = 'flex';
        showcaseView.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      analysisStatus.textContent = error.message || 'Analysis could not be completed';
    } finally {
      analyseBtn.disabled = false;
    }
  });
}

loadCatalog();

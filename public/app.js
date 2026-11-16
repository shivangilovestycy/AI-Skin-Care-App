/**
 * MIRA — SKIN INTELLIGENCE CLIENT LOGIC
 * High-performance, classy, dual AM/PM sequence, 3D rotating product showcases, and quick-commerce integrations.
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
const heroToggleDay = document.querySelector('#hero-toggle-day');
const heroToggleNight = document.querySelector('#hero-toggle-night');
const btnHeroShop = document.querySelector('#btn-hero-shop');
const btnScanAgain = document.querySelector('#btn-scan-again');

// DOM Elements: Routine & Catalog
const tabDayBtn = document.querySelector('#tab-day-btn');
const tabNightBtn = document.querySelector('#tab-night-btn');
const routineTabsContainer = document.querySelector('#routine-tabs-container');
const dayPanel = document.querySelector('#day-routine-panel');
const nightPanel = document.querySelector('#night-routine-panel');
const dayRoutineGrid = document.querySelector('#day-routine-grid');
const nightRoutineGrid = document.querySelector('#night-routine-grid');
const catalogHeading = document.querySelector('#catalog-heading');
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

// DOM Elements: Chatbot & Reminders
const headerReminderBtn = document.querySelector('#header-reminder-btn');
const headerReminderLabel = document.querySelector('#header-reminder-label');
const chatbotLauncher = document.querySelector('#chatbot-launcher');
const chatbotWindow = document.querySelector('#chatbot-window');
const chatCloseBtn = document.querySelector('#chat-close-btn');
const chatMessages = document.querySelector('#chat-messages');
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chipRemindAm = document.querySelector('#chip-remind-am');
const chipRemindPm = document.querySelector('#chip-remind-pm');
const statusChipAm = document.querySelector('#status-chip-am');
const statusChipPm = document.querySelector('#status-chip-pm');
const btnActivateReminders = document.querySelector('#btn-activate-reminders');
const chatSuggestions = document.querySelector('#chat-suggestions');

// Global Application State
let imageData = '';
let activeMediaStream = null;
let activeMode = 'day'; // 'day' | 'night'
let catalogData = { daytime: [], nighttime: [] };
let currentDisplayedProducts = [];
let currentHeroProduct = null;
let reminderState = {
  am: localStorage.getItem('mira_reminder_am') === 'true',
  pm: localStorage.getItem('mira_reminder_pm') === 'true'
};
let lastNotifiedDate = { am: '', pm: '' };

// Default Fallback Catalog Data with Real Packshots and Quick Commerce links
const defaultCatalog = {
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

// Default Protocol Sequences
const defaultAnalysis = {
  summary: "Personalized clinical protocol with distinct daytime barrier shielding and nighttime cellular renewal.",
  dayRoutine: [
    {
      stepNumber: "01",
      step: "Gentle Morning Cleanse",
      guidance: "Wash with lukewarm water and a non-stripping cleanser to preserve your natural lipid mantle.",
      category: "Cleanser",
      recommendedProduct: "CeraVe Hydrating Facial Cleanser"
    },
    {
      stepNumber: "02",
      step: "Antioxidant & Sebum Balance",
      guidance: "Apply 2-3 drops of Niacinamide to balance sebum, soothe irritation, and shield from oxidative stress.",
      category: "Serum",
      recommendedProduct: "The Ordinary Niacinamide 10% + Zinc 1%"
    },
    {
      stepNumber: "03",
      step: "Lightweight Barrier Moisture",
      guidance: "Smooth a pea-sized amount to lock in hydration without clogging pores or feeling greasy.",
      category: "Moisturiser",
      recommendedProduct: "CeraVe Daily Moisturising Lotion"
    },
    {
      stepNumber: "04",
      step: "Broad-Spectrum SPF 50+ Sunscreen",
      guidance: "Non-negotiable daily shield. Apply two finger-lengths across face and neck 15 mins before sun exposure.",
      category: "Sunscreen",
      recommendedProduct: "Minimalist Multi-Vitamin SPF 50 PA++++"
    }
  ],
  nightRoutine: [
    {
      stepNumber: "01",
      step: "Evening Deep Purifying Cleanse",
      guidance: "Removes accumulated atmospheric grime, sunscreen filters, and excess sebum from the day.",
      category: "Cleanser",
      recommendedProduct: "Cetaphil Gentle Skin Cleanser"
    },
    {
      stepNumber: "02",
      step: "Active Cellular Renewal Serum",
      guidance: "Introduce active retinol gradually (2-3 nights per week). Always patch test before application.",
      category: "Active Serum",
      recommendedProduct: "The Ordinary Retinol 0.2% in Squalane"
    },
    {
      stepNumber: "03",
      step: "Deep Overnight Barrier Recovery",
      guidance: "Rich ceramide and fatty acid replenishment while your skin regenerates during deep sleep.",
      category: "Night Cream",
      recommendedProduct: "CeraVe Moisturising Cream (16 oz)"
    }
  ]
};

// =============================================================================
// SYSTEM CLOCK & REMINDER LOOP
// =============================================================================

function updateSystemClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  if (systemTime) systemTime.textContent = timeString;

  // Check if it's time for daily skincare reminders
  checkRoutineReminders(hours, minutes, now.toDateString());
}
setInterval(updateSystemClock, 1000);
updateSystemClock();

function checkRoutineReminders(hours, minutes, dateString) {
  // 08:00 AM Daytime Reminder
  if (reminderState.am && hours === '08' && minutes === '00' && lastNotifiedDate.am !== dateString) {
    lastNotifiedDate.am = dateString;
    triggerNotification(
      '☀️ Morning Skincare Protocol Reminder',
      'It is 8:00 AM! Time for your Daytime Routine: Gentle Cleanse, Niacinamide, Barrier Hydration, and SPF 50.'
    );
  }

  // 10:00 PM (22:00) Nighttime Reminder
  if (reminderState.pm && hours === '22' && minutes === '00' && lastNotifiedDate.pm !== dateString) {
    lastNotifiedDate.pm = dateString;
    triggerNotification(
      '🌙 Evening Skincare Protocol Reminder',
      'It is 10:00 PM! Time for your Nighttime Routine: Deep Cleanse, Retinol in Squalane, and Ceramide Recovery Cream.'
    );
  }
}

function triggerNotification(title, message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: message,
        icon: '/assets/cerave-cleanser.png'
      });
    } catch {
      // Fallback if Notification constructor fails
    }
  }

  // Also append directly inside the Mira Chatbot stream
  appendBotMessage(`🔔 <strong>${title}</strong><br>${message}`);
}

// =============================================================================
// DEVICE CAMERA & SELFIE INPUT
// =============================================================================

function stopCameraStream() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => track.stop());
    activeMediaStream = null;
  }
}

async function startCamera() {
  stopCameraStream();
  if (cameraStatus) cameraStatus.textContent = 'Activating device optical sensor…';

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (cameraStatus) cameraStatus.textContent = 'Camera API not supported in this browser environment. Please upload an image file.';
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

    if (cameraStatus) cameraStatus.textContent = 'Scanner online. Center your face in the circular reticle and capture.';
  } catch (err) {
    console.error('Camera access error:', err);
    if (cameraStatus) cameraStatus.textContent = 'Camera permission denied or camera unavailable. You can upload a photo instead.';
  }
}

function capturePhoto() {
  if (!activeMediaStream || !cameraStreamEl.videoWidth) {
    if (cameraStatus) cameraStatus.textContent = 'Initializing optical feed, please wait…';
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

  // Stop camera tracks
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

  if (cameraStatus) cameraStatus.textContent = 'Biometric input captured. Set your preferences below and build your protocol.';
  
  // Smooth scroll to intake section
  const intakeSection = document.querySelector('#intake-section');
  if (intakeSection) intakeSection.scrollIntoView({ behavior: 'smooth' });
}

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
      if (cameraStatus) cameraStatus.textContent = 'Image loaded from device. Configure context preferences below.';
    };
    reader.readAsDataURL(file);
  });
}

// =============================================================================
// MULTI-VENDOR STORE MODAL (BLINKIT, ZEPTO, NYKAA, BRAND)
// =============================================================================

function openStoreModal(product) {
  if (!product) return;
  modalProductImg.src = product.imageUrl || '/assets/cerave-cleanser.png';
  modalProductCategory.textContent = product.category || 'SKINCARE';
  modalProductTitle.textContent = product.name;
  modalProductPrice.textContent = `${product.price || '₹850'} · ${product.matchRate || '96% Match'}`;

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

// =============================================================================
// 3D ROTATING PRODUCT CATALOG & MINI STAGE RENDERING
// =============================================================================

function renderProductsGrid(products) {
  currentDisplayedProducts = products;
  if (!productGrid) return;
  
  // Every product rendered inside product-3d-stage with spotlight cone & pedestal disc, continuously rotating in 3D
  productGrid.innerHTML = products.map((product, idx) => `
    <article class="product-card">
      <div class="card-top-bar">
        <span class="p-category">${product.category}</span>
        <span class="p-match">${product.matchRate || '95% MATCH'}</span>
      </div>

      <!-- 3D Miniature Spotlight Stage with Turntable Rotating Packshot -->
      <div class="product-3d-stage">
        <div class="stage-mini-cone"></div>
        <div class="stage-mini-pedestal"></div>
        <img class="rotating-bottle-3d" src="${product.imageUrl}" alt="${product.name}" loading="lazy">
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

  // Wire up store modal triggers
  productGrid.querySelectorAll('.btn-open-stores').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      openStoreModal(currentDisplayedProducts[idx]);
    });
  });
}

// Update the Top 3D Hero Showcase Card
function updateHeroShowcase(product) {
  currentHeroProduct = product || currentDisplayedProducts[0] || defaultCatalog.daytime[0];

  if (stageProductImg) stageProductImg.src = currentHeroProduct.imageUrl;
  if (stageCardCategory) stageCardCategory.textContent = currentHeroProduct.category || "BARRIER PROTECTION";
  if (stageCardMatch) stageCardMatch.textContent = `${currentHeroProduct.matchRate || "97% MATCH"} · ${currentHeroProduct.price || "₹850"}`;
  if (heroProductSubtitle) heroProductSubtitle.textContent = `Chosen for your skin barrier · ${currentHeroProduct.name}`;

  if (showcaseView) showcaseView.style.display = 'flex';
}

if (btnHeroShop) {
  btnHeroShop.addEventListener('click', () => {
    openStoreModal(currentHeroProduct);
  });
}

if (btnScanAgain) {
  btnScanAgain.addEventListener('click', () => {
    const topEl = document.querySelector('#top');
    if (topEl) topEl.scrollIntoView({ behavior: 'smooth' });
    retakePhoto();
  });
}

// =============================================================================
// ROUTINE SEQUENCES RENDERING (AM & PM SEPARATION)
// =============================================================================

function renderRoutineSequences(analysis) {
  const dayItems = analysis.dayRoutine || defaultAnalysis.dayRoutine;
  const nightItems = analysis.nightRoutine || defaultAnalysis.nightRoutine;

  if (dayRoutineGrid) {
    dayRoutineGrid.innerHTML = dayItems.map(item => `
      <article class="routine-step-card">
        <div class="routine-card-meta">
          <span class="step-tag">STEP ${item.stepNumber || '01'}</span>
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
          <span class="step-tag">STEP ${item.stepNumber || '01'}</span>
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
      const pName = (btn.getAttribute('data-product') || '').toLowerCase();
      const allProducts = [...(catalogData.daytime || defaultCatalog.daytime), ...(catalogData.nighttime || defaultCatalog.nighttime)];
      const matched = allProducts.find(p => p.name.toLowerCase().includes(pName) || pName.includes(p.name.toLowerCase())) || allProducts[0];
      openStoreModal(matched);
    });
  });
}

// =============================================================================
// SYNCHRONIZED AM / PM MODE SWITCHER
// =============================================================================

function switchMode(mode) {
  activeMode = mode;
  const isDay = mode === 'day';

  // Synchronize Routine sequence tabs
  if (tabDayBtn && tabNightBtn) {
    tabDayBtn.classList.toggle('active', isDay);
    tabNightBtn.classList.toggle('active', !isDay);
  }

  // Synchronize Hero showcase toggle buttons
  if (heroToggleDay && heroToggleNight) {
    heroToggleDay.classList.toggle('active', isDay);
    heroToggleNight.classList.toggle('active', !isDay);
  }

  // Show corresponding routine panel
  if (dayPanel && nightPanel) {
    dayPanel.classList.toggle('active', isDay);
    nightPanel.classList.toggle('active', !isDay);
  }

  // Update catalog heading
  if (catalogHeading) {
    catalogHeading.textContent = isDay
      ? 'Daytime Recommended Formulations (AM)'
      : 'Nighttime Recommended Formulations (PM)';
  }

  // Render the distinct products for Daytime vs Nighttime
  const products = isDay
    ? (catalogData.daytime && catalogData.daytime.length ? catalogData.daytime : defaultCatalog.daytime)
    : (catalogData.nighttime && catalogData.nighttime.length ? catalogData.nighttime : defaultCatalog.nighttime);

  renderProductsGrid(products);
  updateHeroShowcase(products[0]);
}

// Event Listeners for Routine Tabs
if (tabDayBtn) tabDayBtn.addEventListener('click', () => switchMode('day'));
if (tabNightBtn) tabNightBtn.addEventListener('click', () => switchMode('night'));

// Event Listeners for Hero Showcase Toggles
if (heroToggleDay) heroToggleDay.addEventListener('click', () => switchMode('day'));
if (heroToggleNight) heroToggleNight.addEventListener('click', () => switchMode('night'));

// =============================================================================
// FORM SUBMISSION & CLINICAL SYNTHESIS
// =============================================================================

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

      if (data.catalog) {
        catalogData = data.catalog;
      }
      
      const analysis = data.analysis || defaultAnalysis;
      renderRoutineSequences(analysis);
      switchMode(activeMode); // Refresh current products and hero showcase

      analysisStatus.textContent = analysis.careLevel === 'professional'
        ? 'Professional care recommended — see clinical boundary'
        : analysis.summary;

      // Smooth scroll to 3D showcase
      if (showcaseView) {
        showcaseView.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.warn('API analyze error, using default protocol:', error);
      renderRoutineSequences(defaultAnalysis);
      switchMode(activeMode);
      analysisStatus.textContent = 'Active protocol generated from skin profile preferences.';
    } finally {
      analyseBtn.disabled = false;
    }
  });
}

// =============================================================================
// MIRA AI CHATBOT & ROUTINE REMINDER WIDGET
// =============================================================================

function toggleChatbot(forceOpen) {
  if (!chatbotWindow) return;
  const isOpening = forceOpen !== undefined ? forceOpen : chatbotWindow.style.display === 'none';
  chatbotWindow.style.display = isOpening ? 'flex' : 'none';
  if (isOpening) {
    if (chatInput) chatInput.focus();
    scrollChatToBottom();
  }
}

if (chatbotLauncher) chatbotLauncher.addEventListener('click', () => toggleChatbot());
if (chatCloseBtn) chatCloseBtn.addEventListener('click', () => toggleChatbot(false));
if (headerReminderBtn) headerReminderBtn.addEventListener('click', () => toggleChatbot(true));

function scrollChatToBottom() {
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function appendUserMessage(text) {
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg user';
  msgEl.innerHTML = `<div class="msg-bubble"><p>${escapeHtml(text)}</p></div>`;
  chatMessages.appendChild(msgEl);
  scrollChatToBottom();
}

function appendBotMessage(html) {
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg bot';
  msgEl.innerHTML = `<div class="msg-bubble">${html}</div>`;
  chatMessages.appendChild(msgEl);
  scrollChatToBottom();
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// Update Reminder UI Badges and Chips
function updateReminderUI() {
  if (statusChipAm) statusChipAm.textContent = reminderState.am ? 'Active ☀️' : 'Set';
  if (chipRemindAm) chipRemindAm.classList.toggle('active', reminderState.am);

  if (statusChipPm) statusChipPm.textContent = reminderState.pm ? 'Active 🌙' : 'Set';
  if (chipRemindPm) chipRemindPm.classList.toggle('active', reminderState.pm);

  if (headerReminderLabel) {
    if (reminderState.am && reminderState.pm) {
      headerReminderLabel.textContent = 'REMINDERS ACTIVE (AM & PM)';
    } else if (reminderState.am) {
      headerReminderLabel.textContent = 'AM REMINDER ACTIVE';
    } else if (reminderState.pm) {
      headerReminderLabel.textContent = 'PM REMINDER ACTIVE';
    } else {
      headerReminderLabel.textContent = 'SET REMINDERS';
    }
  }

  localStorage.setItem('mira_reminder_am', reminderState.am);
  localStorage.setItem('mira_reminder_pm', reminderState.pm);
}

// Request Notification Permission
async function requestNotificationAccess() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.warn('Notification permission request error:', err);
      }
    }
  }
}

// Reminder toggle helpers
async function toggleAmReminder() {
  await requestNotificationAccess();
  reminderState.am = !reminderState.am;
  updateReminderUI();
  if (reminderState.am) {
    appendBotMessage(`☀️ <strong>08:00 AM Daytime Reminder Activated!</strong><br>I will remind you each morning to cleanse, apply your Niacinamide serum, moisturise, and apply SPF 50.`);
  } else {
    appendBotMessage(`☀️ 08:00 AM Daytime Reminder deactivated.`);
  }
}

async function togglePmReminder() {
  await requestNotificationAccess();
  reminderState.pm = !reminderState.pm;
  updateReminderUI();
  if (reminderState.pm) {
    appendBotMessage(`🌙 <strong>10:00 PM Nighttime Reminder Activated!</strong><br>I will remind you each evening to cleanse away pollutants, apply your Retinol in Squalane, and seal with CeraVe recovery cream.`);
  } else {
    appendBotMessage(`🌙 10:00 PM Nighttime Reminder deactivated.`);
  }
}

if (chipRemindAm) chipRemindAm.addEventListener('click', toggleAmReminder);
if (chipRemindPm) chipRemindPm.addEventListener('click', togglePmReminder);

if (btnActivateReminders) {
  btnActivateReminders.addEventListener('click', async () => {
    await requestNotificationAccess();
    reminderState.am = true;
    reminderState.pm = true;
    updateReminderUI();
    appendBotMessage(`🔔 <strong>Daily Skincare Reminders Enabled!</strong><br>You are all set for:<br>• <strong>08:00 AM:</strong> Daytime Barrier & UV Shield Protocol<br>• <strong>10:00 PM:</strong> Nighttime Cellular Renewal Protocol`);
  });
}

// Intelligent Skincare Chatbot Responses
function generateBotReply(userPrompt) {
  const q = userPrompt.toLowerCase();

  // Reminder command detection
  if (q.includes('remind') || q.includes('alarm') || q.includes('notification')) {
    if (q.includes('day') || q.includes('morning') || q.includes('8 am') || q.includes('am')) {
      toggleAmReminder();
      return;
    }
    if (q.includes('night') || q.includes('evening') || q.includes('10 pm') || q.includes('pm')) {
      togglePmReminder();
      return;
    }
    // Generic reminder request
    reminderState.am = true;
    reminderState.pm = true;
    updateReminderUI();
    appendBotMessage(`🔔 <strong>Both Daily Reminders Activated!</strong><br>• <strong>08:00 AM (Daytime):</strong> Cleanser + Niacinamide + Sunscreen<br>• <strong>10:00 PM (Nighttime):</strong> Cleanser + Retinol + Ceramide Cream.<br>You can adjust these anytime using the chips above.`);
    return;
  }

  // AM vs PM Routine differences
  if (q.includes('difference') || (q.includes('am') && q.includes('pm')) || q.includes('day and night') || q.includes('daytime vs nighttime')) {
    appendBotMessage(`
      <p><strong>☀️ Daytime vs 🌙 Nighttime Protocol:</strong></p>
      <p><strong>1. Daytime Objective: DEFENSE & PROTECTION</strong><br>
      • Focuses on antioxidant shielding (Niacinamide) and broad-spectrum UV defense (Minimalist SPF 50).<br>
      • Uses lightweight hydration that won't feel greasy under the sun.</p>
      <p><strong>2. Nighttime Objective: CELLULAR REPAIR & RECOVERY</strong><br>
      • Removes accumulated environmental grime and particulate pollution (Cetaphil Gentle Cleanser).<br>
      • Introduces active cellular turnover (The Ordinary Retinol in Squalane).<br>
      • Rebuilds the lipid barrier with rich 3-ceramide cream (CeraVe) while you sleep.</p>
    `);
    return;
  }

  // Indian Quick Commerce (Blinkit / Zepto / Nykaa)
  if (q.includes('blinkit') || q.includes('zepto') || q.includes('nykaa') || q.includes('urgent') || q.includes('delivery') || q.includes('where to buy') || q.includes('india')) {
    appendBotMessage(`
      <p><strong>⚡ Delivery Options in India:</strong></p>
      <p>• <strong>Urgent (10–15 Minutes):</strong> Order through <strong>Blinkit</strong> or <strong>Zepto</strong>. Both stock CeraVe, Cetaphil, Minimalist SPF, and The Ordinary essentials with doorstep delivery in major Indian cities.</p>
      <p>• <strong>Standard (1–3 Days):</strong> Order through <strong>Nykaa</strong> or the official brand store for the guaranteed authentic batch with full packaging and verification.</p>
      <p>Click "Shop Options" on any rotating product card to open direct links to each store!</p>
    `);
    return;
  }

  // Retinol Guidance
  if (q.includes('retinol') || q.includes('aging') || q.includes('wrinkle') || q.includes('squalane')) {
    appendBotMessage(`
      <p><strong>🌙 Clinical Retinol Best Practices:</strong></p>
      <p>• <strong>Nighttime Only:</strong> Retinol is photosensitive and degrades under UV sunlight.</p>
      <p>• <strong>Gradual Introduction:</strong> Start with 2 nights per week for 2 weeks, then increase as tolerance builds.</p>
      <p>• <strong>The Sandwich Technique:</strong> If your skin is sensitive, apply a thin layer of CeraVe moisturizer first, followed by Retinol, then another layer of cream.</p>
      <p>• <strong>Always Wear SPF 50:</strong> Retinol increases cell turnover, making fresh skin more susceptible to sunburn.</p>
    `);
    return;
  }

  // Sunscreen Guidance
  if (q.includes('sunscreen') || q.includes('spf') || q.includes('sun') || q.includes('uv')) {
    appendBotMessage(`
      <p><strong>☀️ Sunscreen Clinical Guidelines:</strong></p>
      <p>• Use a broad-spectrum SPF 50+ PA++++ (like Minimalist Multi-Vitamin).</p>
      <p>• Apply the "two-finger rule" across your face and neck 15 minutes before stepping outside.</p>
      <p>• Reapply every 2–3 hours if sweating or outdoors in direct sunlight.</p>
    `);
    return;
  }

  // Acne & Texture Guidance
  if (q.includes('acne') || q.includes('pimple') || q.includes('breakout') || q.includes('texture') || q.includes('pore')) {
    appendBotMessage(`
      <p><strong>✦ Clarifying Protocol:</strong></p>
      <p>• The Ordinary Niacinamide 10% + Zinc 1% regulates daytime sebum without dehydrating your skin.</p>
      <p>• Nighttime Retinol gently speeds up pore clearing and prevents microcomedones from forming.</p>
      <p>• Keep your skin barrier strong with CeraVe ceramides — stripping your skin can actually trigger more oil production!</p>
    `);
    return;
  }

  // Budget Guidance
  if (q.includes('budget') || q.includes('price') || q.includes('cost') || q.includes('cheap') || q.includes('expensive')) {
    appendBotMessage(`
      <p><strong>💰 Budget Flexibility:</strong></p>
      <p>You can enter any budget preference you want in the context intake (e.g., ₹500, ₹1,200, ₹3,000, or Flexible). Minimalist and Cetaphil provide medical-grade formulations starting from ₹399 on Blinkit and Zepto.</p>
    `);
    return;
  }

  // Default intelligent fallback
  appendBotMessage(`
    <p>I've noted that! For your routine, remember to follow the dual AM/PM sequence: <strong>Daytime</strong> focuses on shielding with Niacinamide and SPF 50, while <strong>Nighttime</strong> focuses on cellular renewal with Retinol and rich Ceramide recovery.</p>
    <p>Feel free to ask me about ingredients, urgent Indian quick-commerce links (Blinkit/Zepto), or tap a chip to activate routine reminders!</p>
  `);
}

// Handle Chat Submission
if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = (chatInput.value || '').trim();
    if (!message) return;

    appendUserMessage(message);
    chatInput.value = '';

    // Simulate thoughtful AI typing response
    setTimeout(() => {
      generateBotReply(message);
    }, 350);
  });
}

// Handle Suggestion Pills
if (chatSuggestions) {
  chatSuggestions.querySelectorAll('.suggestion-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q') || btn.textContent;
      appendUserMessage(q);
      setTimeout(() => {
        generateBotReply(q);
      }, 350);
    });
  });
}

// =============================================================================
// INITIAL APPLICATION BOOTSTRAP
// =============================================================================

async function initApp() {
  updateReminderUI();

  // Load Catalog from API
  try {
    const res = await fetch('/api/catalog');
    if (res.ok) {
      const data = await res.json();
      if (data.catalog && data.catalog.daytime && data.catalog.nighttime) {
        catalogData = data.catalog;
      } else if (data.daytime && data.nighttime) {
        catalogData = { daytime: data.daytime, nighttime: data.nighttime };
      }
    }
  } catch (err) {
    console.warn('Initial catalog fetch note:', err);
  }

  // Fallback to default catalog if needed
  if (!catalogData.daytime || catalogData.daytime.length === 0) {
    catalogData = defaultCatalog;
  }

  // Render initial sequences and products for default mode ('day')
  renderRoutineSequences(defaultAnalysis);
  switchMode('day');
}

initApp();

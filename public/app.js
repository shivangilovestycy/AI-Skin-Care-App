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
const budgetPresetChips = document.querySelectorAll('.budget-chip');

// DOM Elements: Concern Confirmation & Safety Questions
const concernChips = document.querySelectorAll('.concern-chip');
const safetyPregnantInput = document.querySelector('#safetyPregnant');
const safetyMedicationInput = document.querySelector('#safetyMedication');
const safetySensitiveInput = document.querySelector('#safetySensitive');
const safetyReactionsInput = document.querySelector('#safetyReactions');

// DOM Elements: Clinical Safety Status Bar
const conflictText = document.querySelector('#conflict-text');
const patchTestText = document.querySelector('#patch-test-text');

// DOM Elements: Weekly Progress Tracker
const btnTrackerOptin = document.querySelector('#btn-tracker-optin');
const btnTrackerDelete = document.querySelector('#btn-tracker-delete');
const week1Img = document.querySelector('#week1-img');
const week1Placeholder = document.querySelector('#week1-placeholder');
const week1Date = document.querySelector('#week1-date');
const week2Img = document.querySelector('#week2-img');
const week2Placeholder = document.querySelector('#week2-placeholder');
const week2Date = document.querySelector('#week2-date');

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

// DOM Elements: Combined Sequential Routine Section
const routineSection = document.querySelector('#routine-section');
const tabDayBtn = document.querySelector('#tab-day-btn');
const tabNightBtn = document.querySelector('#tab-night-btn');
const tabDayBadge = document.querySelector('#tab-day-badge');
const tabNightBadge = document.querySelector('#tab-night-badge');
const routineTabsContainer = document.querySelector('#routine-tabs-container');
const dayPanel = document.querySelector('#day-routine-panel');
const nightPanel = document.querySelector('#night-routine-panel');
const daySequenceGrid = document.querySelector('#day-sequence-grid');
const nightSequenceGrid = document.querySelector('#night-sequence-grid');

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
      stepNumber: "01",
      stepTitle: "Gentle Morning Cleanse",
      phase: "MORNING (AM) · STEP 01",
      category: "Gentle Morning Cleanse",
      name: "CeraVe Hydrating Facial Cleanser",
      match: "Non-stripping lotion cleanser with 3 essential ceramides & hyaluronic acid for morning barrier protection.",
      whyThisProduct: "Replenishes skin ceramides while gently washing away nocturnal sebum, ensuring non-stripping morning hydration.",
      matchRate: "98% MATCH",
      price: "₹850",
      step: "01",
      timing: "Morning (AM)",
      usageTip: "1–2 pumps on damp face. Gently massage 30 seconds in circular motions, rinse with lukewarm water.",
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
      stepNumber: "02",
      stepTitle: "Anti-Pigmentation & Brightening Active",
      phase: "MORNING (AM) · STEP 02",
      category: "Anti-Pigmentation & Brightening Serum",
      name: "Minimalist Tranexamic Acid 3% + HPA",
      match: "Specifically targets post-inflammatory hyperpigmentation and sun spots by curbing melanin transfer without photosensitizing skin.",
      whyThisProduct: "Targets visible hyperpigmentation and dark spots by inhibiting melanin transfer without causing sun sensitivity.",
      matchRate: "98% MATCH",
      price: "₹649",
      step: "02",
      timing: "Morning (AM)",
      usageTip: "Dispense 2–3 drops onto clean face in the morning. Pat gently until absorbed before moisturiser.",
      imageUrl: "/assets/minimalist-tranexamic.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=minimalist+tranexamic+acid",
        zepto: "https://www.zeptonow.com/search?query=minimalist+tranexamic+acid",
        nykaa: "https://www.nykaa.com/search/result/?q=minimalist+tranexamic+acid+3",
        official: "https://beminimalist.co/products/tranexamic-3-hpa"
      }
    },
    {
      id: "day-03",
      stepNumber: "03",
      stepTitle: "Lightweight Barrier Moisture",
      phase: "MORNING (AM) · STEP 03",
      category: "Lightweight Barrier Moisture",
      name: "CeraVe Daily Moisturising Lotion",
      match: "Lightweight, oil-free hydration with MVE delivery technology for sustained 24-hour hydration.",
      whyThisProduct: "Oil-free, lightweight MVE hydration formula that fortifies the lipid moisture barrier without clogging pores.",
      matchRate: "95% MATCH",
      price: "₹1,200",
      step: "03",
      timing: "Morning (AM)",
      usageTip: "Smooth a nickel-sized amount evenly over face and neck to lock in active serum hydration.",
      imageUrl: "/assets/cerave-lotion.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
        zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
        nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+lotion",
        official: "https://www.cerave.com/skincare/moisturizers/daily-moisturizing-lotion"
      }
    },
    {
      id: "day-04",
      stepNumber: "04",
      stepTitle: "Broad-Spectrum UV Shield",
      phase: "MORNING (AM) · STEP 04",
      category: "Broad-Spectrum UV Shield",
      name: "Minimalist Multi-Vitamin SPF 50 PA++++",
      match: "Essential broad-spectrum protection infused with vitamins A, B, C & E. Leaves zero white cast and prevents photodamage.",
      whyThisProduct: "Essential daily photoprotection infused with antioxidant vitamins to prevent UV-triggered melanin dark spots with zero white cast.",
      matchRate: "99% MATCH",
      price: "₹399",
      step: "04",
      timing: "Morning (AM)",
      usageTip: "Apply 2 finger-lengths across face, neck & ears 15 minutes before sun exposure. Reapply every 3 hours.",
      imageUrl: "/assets/minimalist-sunscreen.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=minimalist+sunscreen+spf+50",
        zepto: "https://www.zeptonow.com/search?query=minimalist+sunscreen+spf+50",
        nykaa: "https://www.nykaa.com/search/result/?q=minimalist+multi+vitamin+spf+50",
        official: "https://beminimalist.co/products/multi-vitamin-spf-50"
      }
    },
    {
      id: "day-05",
      stepNumber: "05",
      stepTitle: "Photoprotective Lip Shield",
      phase: "MORNING (AM) · STEP 05",
      category: "Photoprotective Lip Shield",
      name: "Minimalist SPF 30 Lip Balm",
      match: "Formulated with ceramides and broad-spectrum UV filters to shield delicate vermilion borders from sun dark marks.",
      whyThisProduct: "Essential daytime lip photoprotection formulated with ceramides to shield delicate vermilion borders against UV hyperpigmentation.",
      matchRate: "98% MATCH",
      price: "₹299",
      step: "05",
      timing: "Morning (AM)",
      usageTip: "Glide generously across lips every morning. Reapply before sun exposure.",
      imageUrl: "/assets/minimalist-lip-spf.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=minimalist+lip+balm+spf+30",
        zepto: "https://www.zeptonow.com/search?query=minimalist+lip+balm+spf+30",
        nykaa: "https://www.nykaa.com/search/result/?q=minimalist+spf+30+lip+balm",
        official: "https://beminimalist.co/products/spf-30-lip-balm"
      }
    }
  ],
  nighttime: [
    {
      id: "night-01",
      stepNumber: "01",
      stepTitle: "Purifying Evening Cleanse",
      phase: "NIGHT (PM) · STEP 01",
      category: "Purifying Evening Cleanse",
      name: "Cetaphil Gentle Skin Cleanser",
      match: "Clinically proven formula with niacinamide & panthenol to melt away daily grime, sunscreen, and particulate pollution.",
      whyThisProduct: "Dermatologist-recommended non-irritating wash that melts away sunscreen, makeup, and urban micro-pollution without stripping moisture.",
      matchRate: "96% MATCH",
      price: "₹399",
      step: "01",
      timing: "Night (PM)",
      usageTip: "Massage onto dry or damp skin for 45 seconds to dissolve environmental impurities. Rinse clean.",
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
      stepNumber: "02",
      stepTitle: "Pore Clearing & Acne Clarifying Active",
      phase: "NIGHT (PM) · STEP 02",
      category: "Pore Clearing & Acne Clarifying Serum",
      name: "Minimalist Salicylic Acid 2% Serum",
      match: "Penetrates deep into lipid-rich sebaceous pores to clear active acne, blackheads, and comedones.",
      whyThisProduct: "Deeply penetrates lipid-rich follicles to dissolve acne-causing plugs, blackheads, and active inflammation without drying skin.",
      matchRate: "97% MATCH",
      price: "₹549",
      step: "02",
      timing: "Night (PM)",
      usageTip: "Apply 2–3 drops at night on dry skin. Gently pat into pores before barrier cream.",
      imageUrl: "/assets/minimalist-salicylic.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=minimalist+salicylic+acid",
        zepto: "https://www.zeptonow.com/search?query=minimalist+salicylic+acid",
        nykaa: "https://www.nykaa.com/search/result/?q=minimalist+salicylic+acid+2",
        official: "https://beminimalist.co/products/salicylic-acid-2"
      }
    },
    {
      id: "night-03",
      stepNumber: "03",
      stepTitle: "Deep Overnight Barrier Recovery",
      phase: "NIGHT (PM) · STEP 03",
      category: "Deep Overnight Barrier Recovery",
      name: "CeraVe Moisturising Cream (16 oz)",
      match: "Rich ceramide complex with hyaluronic acid to seal in nighttime actives and rebuild the stratum corneum while you sleep.",
      whyThisProduct: "Rich ceramide barrier repair matrix that seals in nocturnal actives and prevents transepidermal water loss overnight.",
      matchRate: "98% MATCH",
      price: "₹1,450",
      step: "03",
      timing: "Night (PM)",
      usageTip: "Generously smooth over face and neck as the final sealing step to prevent transepidermal water loss overnight.",
      imageUrl: "/assets/cerave-cream.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=cerave+moisturising+cream",
        zepto: "https://www.zeptonow.com/search?query=cerave+moisturising+cream",
        nykaa: "https://www.nykaa.com/search/result/?q=cerave+moisturising+cream",
        official: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream"
      }
    },
    {
      id: "night-04",
      stepNumber: "04",
      stepTitle: "Overnight Lip Cellular Mask",
      phase: "NIGHT (PM) · STEP 04",
      category: "Overnight Lip Cellular Mask",
      name: "Minimalist L-Ascorbic + Peptide Lip Mask",
      match: "Intense overnight peptide and antioxidant lip conditioning to seal moisture barrier during deep sleep.",
      whyThisProduct: "Intense overnight peptide and antioxidant lip treatment that repairs chapped skin and restores moisture barrier while you sleep.",
      matchRate: "97% MATCH",
      price: "₹399",
      step: "04",
      timing: "Night (PM)",
      usageTip: "Apply a generous layer to lips before sleeping as the final restorative step.",
      imageUrl: "/assets/minimalist-lip-mask.png",
      stores: {
        blinkit: "https://blinkit.com/s/?q=minimalist+lip+treatment",
        zepto: "https://www.zeptonow.com/search?query=minimalist+lip+treatment",
        nykaa: "https://www.nykaa.com/search/result/?q=minimalist+peptide+lip+mask",
        official: "https://beminimalist.co/products/peptide-lip-mask"
      }
    }
  ]
};

// Default Protocol Guidance
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
      // Fallback
    }
  }

  // Also append directly inside the Mira Chatbot stream
  appendBotMessage(`🔔 <strong>${title}</strong><br>${message}`);
}

// =============================================================================
// DEVICE CAMERA & SELFIE INPUT (AUTOMATIC UPLOAD & SCROLL)
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
    if (cameraStatus) cameraStatus.textContent = 'Camera API not supported in this browser. Please upload a photo from device.';
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

    const existingImg = preview.querySelector('img');
    if (existingImg) existingImg.remove();

    preview.classList.add('active');

    openCameraBtn.style.display = 'none';
    capturePhotoBtn.style.display = 'flex';
    retakePhotoBtn.style.display = 'none';

    if (cameraStatus) cameraStatus.textContent = 'Optical scanner online. Center your face and tap "Capture Selfie".';
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
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(cameraStreamEl, 0, 0, width, height);

  imageData = cameraCanvas.toDataURL('image/jpeg', 0.92);

  stopCameraStream();
  cameraStreamEl.style.display = 'none';

  let img = preview.querySelector('img');
  if (!img) {
    img = document.createElement('img');
    img.alt = 'Captured selfie';
    preview.appendChild(img);
  }
  img.src = imageData;
  img.style.display = 'block';
  preview.classList.add('active');

  capturePhotoBtn.style.display = 'none';
  retakePhotoBtn.style.display = 'flex';
  openCameraBtn.style.display = 'none';

  if (cameraStatus) cameraStatus.textContent = 'Biometric scan uploaded successfully! Click "Generate Skincare Routine" below.';
  
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
      if (cameraStatus) cameraStatus.textContent = 'Photo uploaded successfully! Click "Generate Skincare Routine" below.';
      
      const intakeSection = document.querySelector('#intake-section');
      if (intakeSection) intakeSection.scrollIntoView({ behavior: 'smooth' });
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
// COMBINED SEQUENTIAL PROTOCOL RENDERING (SEPARATE AM & PM VIEWS)
// =============================================================================

function renderSequentialProtocol() {
  const dayProducts = (catalogData.daytime && catalogData.daytime.length) ? catalogData.daytime : defaultCatalog.daytime;
  const nightProducts = (catalogData.nighttime && catalogData.nighttime.length) ? catalogData.nighttime : defaultCatalog.nighttime;

  // Render Daytime Sequential Cards (4 Steps)
  if (daySequenceGrid) {
    daySequenceGrid.innerHTML = dayProducts.map((p, idx) => `
      <article class="protocol-step-card">
        <!-- Card Step Header -->
        <div class="card-step-header">
          <div class="step-num-pill">
            <span class="num">${p.stepNumber || String(idx + 1).padStart(2, '0')}</span>
            <span class="step-label">STEP</span>
          </div>
          <div class="step-meta-titles">
            <span class="step-phase">${p.phase || `MORNING (AM) · STEP ${p.stepNumber}`}</span>
            <h3 class="step-title">${p.stepTitle || p.category}</h3>
          </div>
          <div class="step-match-pill">${p.matchRate || '97% MATCH'}</div>
        </div>

        <!-- 3D Spotlight Stage with Real Crystal-Clear Packshot (NO blur!) -->
        <div class="step-product-stage">
          <div class="stage-cone-beam"></div>
          <div class="stage-pedestal-platform"></div>
          <div class="stage-packshot-wrapper">
            <img class="crisp-product-img" src="${p.imageUrl}" alt="${p.name}" loading="lazy">
          </div>
        </div>

        <!-- Product Identity & Clinical Details -->
        <div class="step-content">
          <div class="product-identity">
            <h4 class="product-name">${p.name}</h4>
            <span class="product-price-tag">${p.price}</span>
          </div>

          <!-- One-line Why This Product Rationale -->
          <div class="product-rationale-box">
            <span class="why-label-pill">WHY THIS PRODUCT</span>
            <p class="why-text">${p.whyThisProduct || p.match}</p>
          </div>

          <div class="step-usage-tips">
            <div class="tip-item">
              <span class="tip-icon">💧</span>
              <span><strong>Application:</strong> ${p.usageTip || 'Apply after cleansing, pat gently into skin.'}</span>
            </div>
          </div>

          <!-- Quick Commerce Options Button -->
          <div class="step-actions">
            <button type="button" class="btn-step-shop" data-id="${p.id}" data-mode="day" data-idx="${idx}">
              <span>Shop Options (Blinkit · Zepto · Nykaa)</span>
              <span class="shop-arrow">→</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Render Nighttime Sequential Cards (3 or 4 Steps)
  if (nightSequenceGrid) {
    nightSequenceGrid.innerHTML = nightProducts.map((p, idx) => `
      <article class="protocol-step-card">
        <!-- Card Step Header -->
        <div class="card-step-header">
          <div class="step-num-pill">
            <span class="num">${p.stepNumber || String(idx + 1).padStart(2, '0')}</span>
            <span class="step-label">STEP</span>
          </div>
          <div class="step-meta-titles">
            <span class="step-phase">${p.phase || `NIGHT (PM) · STEP ${p.stepNumber}`}</span>
            <h3 class="step-title">${p.stepTitle || p.category}</h3>
          </div>
          <div class="step-match-pill">${p.matchRate || '96% MATCH'}</div>
        </div>

        <!-- 3D Spotlight Stage with Real Crystal-Clear Packshot (NO blur!) -->
        <div class="step-product-stage">
          <div class="stage-cone-beam"></div>
          <div class="stage-pedestal-platform"></div>
          <div class="stage-packshot-wrapper">
            <img class="crisp-product-img" src="${p.imageUrl}" alt="${p.name}" loading="lazy">
          </div>
        </div>

        <!-- Product Identity & Clinical Details -->
        <div class="step-content">
          <div class="product-identity">
            <h4 class="product-name">${p.name}</h4>
            <span class="product-price-tag">${p.price}</span>
          </div>

          <!-- One-line Why This Product Rationale -->
          <div class="product-rationale-box">
            <span class="why-label-pill">WHY THIS PRODUCT</span>
            <p class="why-text">${p.whyThisProduct || p.match}</p>
          </div>

          <div class="step-usage-tips">
            <div class="tip-item">
              <span class="tip-icon">🌙</span>
              <span><strong>Application:</strong> ${p.usageTip || 'Apply at night on clean skin before bed.'}</span>
            </div>
          </div>

          <!-- Quick Commerce Options Button -->
          <div class="step-actions">
            <button type="button" class="btn-step-shop" data-id="${p.id}" data-mode="night" data-idx="${idx}">
              <span>Shop Options (Blinkit · Zepto · Nykaa)</span>
              <span class="shop-arrow">→</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Update step badges if elements exist
  if (tabDayBadge) tabDayBadge.textContent = `${dayProducts.length} Steps`;
  if (tabNightBadge) tabNightBadge.textContent = `${nightProducts.length} Steps`;

  // Wire up all "Shop Options" buttons
  document.querySelectorAll('.btn-step-shop').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const list = mode === 'day' ? dayProducts : nightProducts;
      openStoreModal(list[idx]);
    });
  });
}

// Update Top Hero Showcase Card
function updateHeroShowcase(product) {
  const dayProducts = (catalogData.daytime && catalogData.daytime.length) ? catalogData.daytime : defaultCatalog.daytime;
  currentHeroProduct = product || dayProducts[0];

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
// SYNCHRONIZED AM / PM MODE SWITCHER
// =============================================================================

function switchMode(mode) {
  activeMode = mode;
  const isDay = mode === 'day';

  // Toggle routine tabs
  if (tabDayBtn && tabNightBtn) {
    tabDayBtn.classList.toggle('active', isDay);
    tabNightBtn.classList.toggle('active', !isDay);
  }

  // Toggle hero showcase buttons
  if (heroToggleDay && heroToggleNight) {
    heroToggleDay.classList.toggle('active', isDay);
    heroToggleNight.classList.toggle('active', !isDay);
  }

  // Show corresponding routine panel (separate AM & PM viewing)
  if (dayPanel && nightPanel) {
    dayPanel.classList.toggle('active', isDay);
    nightPanel.classList.toggle('active', !isDay);
  }

  // Update Hero Spotlight to the primary hero product for the selected mode
  const products = isDay
    ? ((catalogData.daytime && catalogData.daytime.length) ? catalogData.daytime : defaultCatalog.daytime)
    : ((catalogData.nighttime && catalogData.nighttime.length) ? catalogData.nighttime : defaultCatalog.nighttime);

  updateHeroShowcase(products[0]);
}

// Event Listeners for Routine Tabs
if (tabDayBtn) tabDayBtn.addEventListener('click', () => switchMode('day'));
if (tabNightBtn) tabNightBtn.addEventListener('click', () => switchMode('night'));

// Event Listeners for Hero Showcase Toggles
if (heroToggleDay) heroToggleDay.addEventListener('click', () => switchMode('day'));
if (heroToggleNight) heroToggleNight.addEventListener('click', () => switchMode('night'));

// =============================================================================
// BUDGET PRESET CHIPS WIRING
// =============================================================================

if (budgetPresetChips && budgetPresetChips.length) {
  budgetPresetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      budgetPresetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-budget');
      if (budgetInput) {
        budgetInput.value = val === '1000' ? '₹1,000' : val === '4000' ? '₹4,000' : '₹2,500';
      }
    });
  });
}

if (budgetInput) {
  budgetInput.addEventListener('input', () => {
    const raw = budgetInput.value.replace(/,/g, '');
    const num = parseInt(raw.match(/\d+/)?.[0] || '0', 10);
    budgetPresetChips.forEach(chip => {
      const chipVal = parseInt(chip.getAttribute('data-budget'), 10);
      if (num > 0) {
        if (num <= 1400 && chipVal === 1000) chip.classList.add('active');
        else if (num >= 3400 && chipVal === 4000) chip.classList.add('active');
        else if (num > 1400 && num < 3400 && chipVal === 2500) chip.classList.add('active');
        else chip.classList.remove('active');
      }
    });
  });
}

// =============================================================================
// CONCERN CHIPS WIRING ("WHAT MIRA NOTICED" STEP)
// =============================================================================

function getConfirmedConcerns() {
  const activeChips = Array.from(document.querySelectorAll('.concern-chip.active'));
  return activeChips.map(c => c.getAttribute('data-concern'));
}

function syncGoalsFromChips() {
  const confirmed = getConfirmedConcerns();
  if (goalsInput) {
    goalsInput.value = confirmed.join(', ');
  }
}

if (concernChips && concernChips.length) {
  concernChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      syncGoalsFromChips();
    });
  });
}

// =============================================================================
// WEEKLY SKIN PROGRESS TRACKER LOGIC (LOCAL PRIVACY FIRST)
// =============================================================================

function loadWeeklyProgress() {
  try {
    const dataStr = localStorage.getItem('mira_weekly_progress');
    const consent = localStorage.getItem('mira_tracker_consent') === 'true';

    if (btnTrackerOptin) {
      if (consent) {
        btnTrackerOptin.classList.add('active');
        btnTrackerOptin.innerHTML = '<span>✓ Progress Tracker Active (Consent Granted)</span>';
      } else {
        btnTrackerOptin.classList.remove('active');
        btnTrackerOptin.innerHTML = '<span>✓ Enable Progress Tracker & Save Selfie</span>';
      }
    }

    if (!dataStr || !consent) {
      if (week1Img) { week1Img.style.display = 'none'; week1Img.src = ''; }
      if (week1Placeholder) week1Placeholder.style.display = 'flex';
      if (week2Img) { week2Img.style.display = 'none'; week2Img.src = ''; }
      if (week2Placeholder) week2Placeholder.style.display = 'flex';
      return;
    }

    const progress = JSON.parse(dataStr);
    if (progress.week1 && week1Img) {
      week1Img.src = progress.week1.image;
      week1Img.style.display = 'block';
      if (week1Placeholder) week1Placeholder.style.display = 'none';
      if (week1Date) week1Date.textContent = progress.week1.date || 'Baseline';
    }

    if (progress.week2 && week2Img) {
      week2Img.src = progress.week2.image;
      week2Img.style.display = 'block';
      if (week2Placeholder) week2Placeholder.style.display = 'none';
      if (week2Date) week2Date.textContent = progress.week2.date || 'Current Week';
    }
  } catch (err) {
    console.warn('Weekly progress load note:', err);
  }
}

if (btnTrackerOptin) {
  btnTrackerOptin.addEventListener('click', () => {
    localStorage.setItem('mira_tracker_consent', 'true');
    btnTrackerOptin.classList.add('active');
    btnTrackerOptin.innerHTML = '<span>✓ Progress Tracker Active (Consent Granted)</span>';

    // Save current selfie if available
    if (imageData) {
      try {
        const existing = JSON.parse(localStorage.getItem('mira_weekly_progress') || '{}');
        const nowFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        if (!existing.week1) {
          existing.week1 = { image: imageData, date: `${nowFormatted} (Baseline)` };
        } else {
          existing.week2 = { image: imageData, date: `${nowFormatted} (Follow-up)` };
        }
        localStorage.setItem('mira_weekly_progress', JSON.stringify(existing));
        loadWeeklyProgress();
        alert('Your selfie has been securely saved to your local browser progress tracker!');
      } catch (err) {
        console.warn('Storage error:', err);
      }
    } else {
      alert('Progress tracker enabled! Capture or upload a selfie above, then click this button to store your baseline scan.');
    }
  });
}

if (btnTrackerDelete) {
  btnTrackerDelete.addEventListener('click', () => {
    if (confirm('Delete all stored selfies from this device? This action is permanent and clears your local photos.')) {
      localStorage.removeItem('mira_weekly_progress');
      localStorage.removeItem('mira_tracker_consent');
      loadWeeklyProgress();
      alert('All local progress tracker photos have been deleted securely.');
    }
  });
}

// =============================================================================
// FORM SUBMISSION & AUTOMATIC SCROLL TO GENERATED SKINCARE ROUTINE
// =============================================================================

if (analyseBtn) {
  analyseBtn.addEventListener('click', async () => {
    if (analysisStatus) analysisStatus.textContent = 'Synthesizing your personalized skincare protocol…';
    analyseBtn.disabled = true;
    analyseBtn.innerHTML = '<span>✦ Synthesizing Your Custom Skincare Protocol...</span>';

    const confirmedConcerns = getConfirmedConcerns();
    const payload = {
      imageData,
      ageRange: ageRangeInput.value,
      goals: goalsInput.value || confirmedConcerns.join(', '),
      confirmedConcerns,
      sensitivities: sensitivitiesInput.value,
      budget: budgetInput.value,
      pregnantOrBreastfeeding: safetyPregnantInput ? safetyPregnantInput.value : 'no',
      medication: safetyMedicationInput ? safetyMedicationInput.value : '',
      verySensitive: safetySensitiveInput ? safetySensitiveInput.value : 'no',
      allergies: safetyReactionsInput ? safetyReactionsInput.value : ''
    };

    try {
      // Ultra-fast controller so generation always completes in < 2.5 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2200);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Protocol generation error');

      if (data.catalog) {
        catalogData = data.catalog;
      }
      
      const analysis = data.analysis || defaultAnalysis;

      // Update safety conflict check & patch test notices
      if (data.ingredientConflictCheck && conflictText) {
        conflictText.textContent = data.ingredientConflictCheck;
      }
      if (data.patchTestReminder && patchTestText) {
        patchTestText.textContent = data.patchTestReminder;
      }

      // Render the updated protocol
      renderSequentialProtocol();
      switchMode(activeMode);

      if (analysisStatus) {
        analysisStatus.textContent = analysis.careLevel === 'professional'
          ? 'Professional care recommended — see clinical boundary'
          : analysis.summary;
      }

      // Automatically jump directly to the generated skincare routine section!
      const targetSection = document.querySelector('#routine-section');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.warn('Instant client synthesis active:', error);
      try {
        const catRes = await fetch(`/api/catalog?budget=${encodeURIComponent(payload.budget)}&concerns=${encodeURIComponent(confirmedConcerns.join(','))}`);
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData.catalog) catalogData = catData.catalog;
          if (catData.ingredientConflictCheck && conflictText) conflictText.textContent = catData.ingredientConflictCheck;
          if (catData.patchTestReminder && patchTestText) patchTestText.textContent = catData.patchTestReminder;
        }
      } catch {}
      renderSequentialProtocol();
      switchMode(activeMode);
      if (analysisStatus) {
        analysisStatus.textContent = 'Active protocol generated from skin profile preferences.';
      }
      const targetSection = document.querySelector('#routine-section');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } finally {
      analyseBtn.disabled = false;
      analyseBtn.innerHTML = '<span class="btn-star-icon">✦</span> <span>Generate Skincare Routine →</span>';
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

function generateBotReply(userPrompt) {
  const q = userPrompt.toLowerCase();

  if (q.includes('remind') || q.includes('alarm') || q.includes('notification')) {
    if (q.includes('day') || q.includes('morning') || q.includes('8 am') || q.includes('am')) {
      toggleAmReminder();
      return;
    }
    if (q.includes('night') || q.includes('evening') || q.includes('10 pm') || q.includes('pm')) {
      togglePmReminder();
      return;
    }
    reminderState.am = true;
    reminderState.pm = true;
    updateReminderUI();
    appendBotMessage(`🔔 <strong>Both Daily Reminders Activated!</strong><br>• <strong>08:00 AM (Daytime):</strong> Cleanser + Niacinamide + Sunscreen<br>• <strong>10:00 PM (Nighttime):</strong> Cleanser + Retinol + Ceramide Cream.<br>You can adjust these anytime using the chips above.`);
    return;
  }

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

  if (q.includes('blinkit') || q.includes('zepto') || q.includes('nykaa') || q.includes('urgent') || q.includes('delivery') || q.includes('where to buy') || q.includes('india')) {
    appendBotMessage(`
      <p><strong>⚡ Delivery Options in India:</strong></p>
      <p>• <strong>Urgent (10–15 Minutes):</strong> Order through <strong>Blinkit</strong> or <strong>Zepto</strong>. Both stock CeraVe, Cetaphil, Minimalist SPF, and The Ordinary essentials with doorstep delivery in major Indian cities.</p>
      <p>• <strong>Standard (1–3 Days):</strong> Order through <strong>Nykaa</strong> or the official brand store for the guaranteed authentic batch with full packaging and verification.</p>
      <p>Click "Shop Options" on any step card to open direct links to each store!</p>
    `);
    return;
  }

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

  if (q.includes('sunscreen') || q.includes('spf') || q.includes('sun') || q.includes('uv')) {
    appendBotMessage(`
      <p><strong>☀️ Sunscreen Clinical Guidelines:</strong></p>
      <p>• Use a broad-spectrum SPF 50+ PA++++ (like Minimalist Multi-Vitamin).</p>
      <p>• Apply the "two-finger rule" across your face and neck 15 minutes before stepping outside.</p>
      <p>• Reapply every 2–3 hours if sweating or outdoors in direct sunlight.</p>
    `);
    return;
  }

  if (q.includes('acne') || q.includes('pimple') || q.includes('breakout') || q.includes('texture') || q.includes('pore')) {
    appendBotMessage(`
      <p><strong>✦ Clarifying Protocol:</strong></p>
      <p>• The Ordinary Niacinamide 10% + Zinc 1% regulates daytime sebum without dehydrating your skin.</p>
      <p>• Nighttime Retinol gently speeds up pore clearing and prevents microcomedones from forming.</p>
      <p>• Keep your skin barrier strong with CeraVe ceramides — stripping your skin can actually trigger more oil production!</p>
    `);
    return;
  }

  if (q.includes('budget') || q.includes('price') || q.includes('cost') || q.includes('cheap') || q.includes('expensive')) {
    appendBotMessage(`
      <p><strong>💰 Budget Flexibility:</strong></p>
      <p>You can enter any budget preference you want in the context intake (e.g., ₹500, ₹1,200, ₹3,000, or Flexible). Minimalist and Cetaphil provide personalized formulations starting from ₹399 on Blinkit and Zepto.</p>
    `);
    return;
  }

  appendBotMessage(`
    <p>I've noted that! For your routine, remember to follow the dual AM/PM sequence: <strong>Daytime</strong> focuses on shielding with Niacinamide and SPF 50, while <strong>Nighttime</strong> focuses on cellular renewal with Retinol and rich Ceramide recovery.</p>
    <p>Feel free to ask me about ingredients, urgent Indian quick-commerce links (Blinkit/Zepto), or tap a chip to activate routine reminders!</p>
  `);
}

if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = (chatInput.value || '').trim();
    if (!message) return;

    appendUserMessage(message);
    chatInput.value = '';

    setTimeout(() => {
      generateBotReply(message);
    }, 350);
  });
}

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
  loadWeeklyProgress();
  syncGoalsFromChips();

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

  if (!catalogData.daytime || catalogData.daytime.length === 0) {
    catalogData = defaultCatalog;
  }

  // Render combined sequential protocol for day and night
  renderSequentialProtocol();
  switchMode('day');
}

initApp();

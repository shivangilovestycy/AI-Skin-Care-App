const selfie = document.querySelector('#selfie');
const preview = document.querySelector('#preview');
const openCameraBtn = document.querySelector('#open-camera');
const capturePhotoBtn = document.querySelector('#capture-photo');
const retakePhotoBtn = document.querySelector('#retake-photo');
const cameraStreamEl = document.querySelector('#camera-stream');
const cameraCanvas = document.querySelector('#camera-canvas');
const previewPlaceholder = document.querySelector('#preview-placeholder');
const cameraStatus = document.querySelector('#camera-status');

const analyse = document.querySelector('#analyse');
const routine = document.querySelector('#routine');
const productGrid = document.querySelector('#product-grid');
const status = document.querySelector('#analysis-status');

let imageData = '';
let activeMediaStream = null;

// Stop any active camera stream
function stopCameraStream() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => track.stop());
    activeMediaStream = null;
  }
}

// Start device camera
async function startCamera() {
  stopCameraStream();
  cameraStatus.textContent = 'Requesting camera access…';

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraStatus.textContent = 'Camera not supported in this browser. Please use the file upload option.';
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

    cameraStatus.textContent = 'Camera active. Align your face inside the target and tap Capture Selfie.';
  } catch (err) {
    console.error('Camera access error:', err);
    cameraStatus.textContent = 'Camera access was denied or unavailable. You can upload an image file instead.';
  }
}

// Capture photo from video feed
function capturePhoto() {
  if (!activeMediaStream || !cameraStreamEl.videoWidth) {
    cameraStatus.textContent = 'Waiting for camera feed to initialize…';
    return;
  }

  const width = cameraStreamEl.videoWidth;
  const height = cameraStreamEl.videoHeight;
  cameraCanvas.width = width;
  cameraCanvas.height = height;

  const ctx = cameraCanvas.getContext('2d');
  // Mirror frame to match what the user sees
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

  cameraStatus.textContent = 'Selfie captured! Fill in your preferences and click "Build my routine →".';
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
    cameraStatus.textContent = 'Image loaded. Fill in your context below.';
  };
  reader.readAsDataURL(file);
});

function renderProducts(products) {
  productGrid.innerHTML = products.map(product => `<article class="product"><p class="product-type">${product.category}</p><div class="packshot">VERIFIED ASSET SLOT</div><h3>${product.name}</h3><p>${product.match}</p><a href="${product.url}" target="_blank" rel="noreferrer">${product.retailer} →</a></article>`).join('');
}

function renderRoutine(analysis) {
  routine.innerHTML = analysis.routine.map((item, i) => `<article class="routine-item"><span class="routine-no">0${i + 1}</span><h3>${item.step}</h3><p>${item.guidance}</p></article>`).join('');
}

async function loadCatalog() {
  try {
    const data = await fetch('/api/catalog').then(r => r.json());
    if (data.products) renderProducts(data.products);
  } catch (err) {
    console.warn('Could not load initial catalog:', err);
  }
}

analyse.addEventListener('click', async () => {
  if (!imageData) {
    status.textContent = 'Please take a selfie or upload a photo first';
    document.querySelector('#top').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  status.textContent = 'Building your cautious routine…';
  analyse.disabled = true;

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        imageData,
        ageRange: document.querySelector('#ageRange').value,
        goals: document.querySelector('#goals').value,
        sensitivities: document.querySelector('#sensitivities').value,
        budget: document.querySelector('#budget').value
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    renderRoutine(data.analysis);
    if (data.catalog) renderProducts(data.catalog);
    status.textContent = data.analysis.careLevel === 'professional' ? 'Professional care recommended — see the caution below' : data.analysis.summary;
    document.querySelector('#result').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    status.textContent = error.message || 'Analysis could not be completed';
  } finally {
    analyse.disabled = false;
  }
});

loadCatalog();

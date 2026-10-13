// Data structure for 10 Products with local image folder relative paths
const products = [
  {
    id: 1,
    name: "Aethel Low Table",
    description: "Sculptural green onyx marble slab paired with dual tapered ebonized oak legs and subtle brushed brass base trim.",
    specs: "Dim: 180 × 75 × 42 cm • Material: Green Onyx & Ebonized Oak",
    folder: "images/aethel/",
    images: [
      "images/aethel/angle_1.png",
      "images/aethel/angle_2.png",
      "images/aethel/angle_3.png",
      "images/aethel/angle_4.png"
    ]
  },
  {
    id: 2,
    name: "Komorebi Lounge Chair",
    description: "Continuous bent ash wood frame with textured boucle wool cushioning.",
    specs: "Dim: 82 × 88 × 74 cm • Material: Ash & Natural Boucle",
    folder: "images/product_2/",
    images: [
      "images/product_2/angle_1.png",
      "images/product_2/angle_2.png",
      "images/product_2/angle_3.png",
      "images/product_2/angle_4.png"
    ]
  },
  {
    id: 3,
    name: "Solstice Credenza",
    description: "Minimalist oak storage sideboard with fluted sliding panels.",
    specs: "Dim: 210 × 50 × 68 cm • Material: White Oak & Anodized Aluminum",
    folder: "images/product_3/",
    images: [
      "images/product_3/angle_1.png",
      "images/product_3/angle_2.png",
      "images/product_3/angle_3.png",
      "images/product_3/angle_4.png"
    ]
  }
];

let currentProductIndex = 0;
let currentAngleIndex = 0;

// DOM Elements
const activeImage = document.getElementById('activeImage');
const hoverZone = document.getElementById('hoverZone');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productTitle = document.getElementById('productTitle');
const productDesc = document.getElementById('productDesc');
const productSpecs = document.getElementById('productSpecs');

// Load Product Data
function renderProduct(index) {
  const product = products[index];
  currentAngleIndex = 0;
  
  // Fade transition effect
  activeImage.style.opacity = '0';
  
  setTimeout(() => {
    activeImage.src = product.images[currentAngleIndex];
    productTitle.textContent = product.name;
    productDesc.textContent = product.description;
    productSpecs.textContent = product.specs;
    activeImage.style.opacity = '1';
  }, 100);
}

// Track Cursor Movement across Image for Parallax Angle Switching
hoverZone.addEventListener('mousemove', (e) => {
  const rect = hoverZone.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const percentage = Math.max(0, Math.min(1, mouseX / rect.width));
  
  const currentProduct = products[currentProductIndex];
  const totalAngles = currentProduct.images.length;
  
  // Calculate angle index based on horizontal mouse percentage
  const newAngleIndex = Math.floor(percentage * totalAngles);
  const clampedAngleIndex = Math.min(newAngleIndex, totalAngles - 1);

  if (clampedAngleIndex !== currentAngleIndex) {
    currentAngleIndex = clampedAngleIndex;
    activeImage.src = currentProduct.images[currentAngleIndex];
  }
});

// Navigation Arrow Click Handlers
prevBtn.addEventListener('click', () => {
  currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
  renderProduct(currentProductIndex);
});

nextBtn.addEventListener('click', () => {
  currentProductIndex = (currentProductIndex + 1) % products.length;
  renderProduct(currentProductIndex);
});

// Initialize on page load
renderProduct(currentProductIndex);


html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
}

.hero-image {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

.food-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.food-card:hover {
  transform: translateY(-5px);
}

.food-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.category-btn {
  padding: 10px 20px;
  border: 1px solid #fed7aa;
  border-radius: 25px;
  background: white;
  cursor: pointer;
  transition: 0.2s;
}

.category-btn:hover,
.category-btn.active {
  background: #ea580c;
  color: white;
  border-color: #ea580c;
}

.add-btn {
  background: #ea580c;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.add-btn:hover {
  background: #c2410c;
}

.cart-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
}

.cart-overlay.hidden {
  display: none;
}

.cart-panel {
  background: white;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  padding: 24px;
  overflow-y: auto;
}

.quantity-btn {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 4px 12px;
  cursor: pointer;
}

@media (max-width: 640px) {
  .hero-image {
    height: 250px;
  }

  nav a[href="#menu"] {
    display: none;
  }

  .cart-panel {
    max-width: 100%;
  }
}

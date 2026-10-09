
const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 179,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 220,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 299,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Classic Burger",
    category: "Burger",
    price: 149,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Chocolate Dessert",
    category: "Dessert",
    price: 129,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];

const foodList = document.getElementById("food-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartOverlay = document.getElementById("cart-overlay");

// DISPLAY FOOD CARDS
function displayFoods(items) {
  if (items.length === 0) {
    foodList.innerHTML =
      '<p class="text-center col-span-full">No food found.</p>';
    return;
  }

  foodList.innerHTML = items.map(food => `
    <article class="food-card">
      <img
        src="${food.image}"
        alt="${food.name}"
        class="food-image"
        onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Food'">

      <div class="p-5">
        <p class="text-orange-600">${food.category}</p>
        <h3 class="text-xl font-bold mt-2">${food.name}</h3>

        <div class="flex justify-between items-center mt-5">
          <span class="text-xl font-bold">₹${food.price}</span>
          <button class="add-btn" data-add="${food.id}">
            + Add
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// FILTER FOOD CATEGORIES
function filterFood(category) {
  const filteredFoods = category === "All"
    ? foods
    : foods.filter(food => food.category === category);

  displayFoods(filteredFoods);

  document.querySelectorAll(".category-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });
}

// ADD FOOD TO CART
function addToCart(foodId) {
  const food = foods.find(item => item.id === foodId);
  const existingItem = cart.find(item => item.id === foodId);

  if (!food) return;

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...food, quantity: 1 });
  }

  updateCart();
}

// CHANGE QUANTITY
function changeQuantity(foodId, amount) {
  const item = cart.find(food => food.id === foodId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(food => food.id !== foodId);
  }

  updateCart();
}

// UPDATE CART COUNT, ITEMS AND TOTAL
function updateCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = count;
  cartTotal.textContent = "₹" + total.toLocaleString("en-IN");

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="text-gray-500 py-6">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="border-b py-4">
      <h3 class="font-bold">${item.name}</h3>
      <p>₹${item.price} each</p>

      <div class="flex justify-between items-center mt-3">
        <div class="flex items-center gap-3">
          <button class="quantity-btn"
            data-change="${item.id}" data-amount="-1">−</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn"
            data-change="${item.id}" data-amount="1">+</button>
        </div>

        <strong>₹${item.price * item.quantity}</strong>
      </div>
    </div>
  `).join("");
}

// OPEN AND CLOSE CART
function toggleCart(show) {
  cartOverlay.classList.toggle("hidden", !show);

  if (show) updateCart();
}

document.getElementById("open-cart").addEventListener("click", () => {
  toggleCart(true);
});

document.getElementById("close-cart").addEventListener("click", () => {
  toggleCart(false);
});

cartOverlay.addEventListener("click", event => {
  if (event.target === cartOverlay) {
    toggleCart(false);
  }
});

// HANDLE ADD BUTTONS
foodList.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (button) {
    addToCart(Number(button.dataset.add));
  }
});

// HANDLE CATEGORY BUTTONS
document.getElementById("categories").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (button) {
    filterFood(button.dataset.category);
  }
});

// HANDLE QUANTITY BUTTONS
cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-change]");

  if (button) {
    changeQuantity(
      Number(button.dataset.change),
      Number(button.dataset.amount)
    );
  }
});

// DEMO CHECKOUT
document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add food before placing an order.");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  alert(
    "Demo order placed!\nTotal: ₹" +
    total.toLocaleString("en-IN") +
    "\nNo real order or payment was processed."
  );

  cart = [];
  updateCart();
  toggleCart(false);
});

// INITIALIZE THE PAGE
displayFoods(foods);
updateCart();

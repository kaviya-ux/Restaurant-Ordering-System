const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"
    },
    {
        id: 2,
        name: "Chicken Burger",
        category: "Burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 249,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
        id: 4,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 149,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
        id: 5,
        name: "French Fries",
        category: "Burger",
        price: 99,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"
    },
    {
        id: 6,
        name: "Veg Pizza",
        category: "Pizza",
        price: 249,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
    },
    {
        id: 7,
        name: "Mango Juice",
        category: "Drinks",
        price: 89,
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4"
    },
    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 119,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb"
    }
];
// Cart
let cart = JSON.parse(localStorage.getItem("foodFestaCart")) || [];
// Selected category
let selectedCategory = "All";
// Display foods
function displayFoods(foodList) {
    const container = document.getElementById("foodContainer");
    container.innerHTML = "";
    document.getElementById("foodCount").textContent = `${foodList.length} items`;
    if (foodList.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-10">
                <h3 class="text-2xl font-bold text-gray-500">
                    No food found
                </h3>
            </div>
        `;
        return;
    }
    foodList.forEach(function(food) {
        const card = document.createElement("div");
        card.className = "food-card bg-white rounded-xl shadow-md overflow-hidden";
        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}" class="food-image">
            <div class="p-5">
                <div class="flex justify-between items-start">
                    <h3 class="text-xl font-bold">
                        ${food.name}
                    </h3>
                    <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
                        ${food.category}
                    </span>
                </div>
                <div class="flex justify-between items-center mt-5">
                    <span class="text-xl font-bold text-orange-600">
                        ₹${food.price}
                    </span>
                    <button onclick="addToCart(${food.id})" class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                        Add
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
// Filter category
function filterCategory(category) {
    selectedCategory = category;
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    let filteredFoods = foods.filter(function(food) {
        const categoryMatch = category === "All" || food.category === category;
        const searchMatch = food.name.toLowerCase().includes(searchText);
        return categoryMatch && searchMatch;
    });
    displayFoods(filteredFoods);
}
// Search food
function searchFood() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const filteredFoods = foods.filter(function(food) {
        const categoryMatch = selectedCategory === "All" || food.category === selectedCategory;
        const searchMatch = food.name.toLowerCase().includes(searchText);
        return categoryMatch && searchMatch;
    });
    displayFoods(filteredFoods);
}
// Add to cart
function addToCart(foodId) {
    const food = foods.find(function(item) {
        return item.id === foodId;
    });
    const existingItem = cart.find(function(item) {
        return item.id === foodId;
    });
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1
        });
    }
    saveCart();
    updateCart();
    showToast();
}
// Update cart
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-10">
                <div class="text-5xl mb-4">
                    🛒
                </div>
                <p class="text-gray-500">
                    Your cart is empty
                </p>
            </div>
        `;
    }
    cart.forEach(function(item) {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="flex gap-3">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <h3 class="font-bold">
                        ${item.name}
                    </h3>
                    <p class="text-orange-600 font-semibold">
                        ₹${item.price}
                    </p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="decreaseQuantity(${item.id})" class="quantity-btn bg-gray-200">
                            -
                        </button>
                        <span>
                            ${item.quantity}
                        </span>
                        <button  onclick="increaseQuantity(${item.id})" class="quantity-btn bg-orange-500 text-white">
                            +
                        </button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500">
                    🗑️
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    calculateTotal();
    updateCartCount();
}
// Increase quantity
function increaseQuantity(foodId) {
    const item = cart.find(function(item) {
        return item.id === foodId;
    });
    if (item) {
        item.quantity++;
    }
    saveCart();
    updateCart();
}
// Decrease quantity
function decreaseQuantity(foodId) {
    const item = cart.find(function(item) {
        return item.id === foodId;
    });

    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(function(item) {
                return item.id !== foodId;
            });
        }
    }
    saveCart();
    updateCart();
}
// Remove item
function removeFromCart(foodId) {
    cart = cart.filter(function(item) {
        return item.id !== foodId;
    });
    saveCart();
    updateCart();
}
// Calculate total
function calculateTotal() {
    let subtotal = 0;
    cart.forEach(function(item) {
        subtotal += item.price * item.quantity;
    });
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `₹${total.toFixed(2)}`;
}
// Update cart count
function updateCartCount() {
    let count = 0;
    cart.forEach(function(item) {
        count += item.quantity;
    });
    document.getElementById("cartCount").textContent = count;
}
// Save cart
function saveCart() {
    localStorage.setItem(
        "foodFestaCart",
        JSON.stringify(cart)
    );
}
// Open cart
function openCart() {
    document.getElementById("cartSidebar")
        .classList.remove("translate-x-full");
    document.getElementById("cartOverlay")
        .classList.remove("hidden");
}
// Close cart
function closeCart() {
    document.getElementById("cartSidebar")
        .classList.add("translate-x-full");
    document.getElementById("cartOverlay")
        .classList.add("hidden");
}
// Clear cart
function clearCart() {
    if (cart.length === 0) {
        return;
    }
    const confirmClear = confirm("Are you sure you want to clear the cart?");
    if (confirmClear) {
        cart = [];
        saveCart();
        updateCart();
    }
}
// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert(
        "Order placed successfully! 🍕"
    );
    cart = [];
    saveCart();
    updateCart();
    closeCart();
}
// Toast notification
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.remove("hidden");
    setTimeout(function() {
        toast.classList.add("hidden");
    }, 2000);
}
// Initial display
displayFoods(foods);
updateCart();

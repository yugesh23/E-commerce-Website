document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const priceRange = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");
    const categoryButtons = document.querySelectorAll(".category-list button");
    const cartToggle = document.getElementById("cart-toggle");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
  
    let cartData = [];
  
    // Display all products initially
    displayProducts(products);
  
    // Update price range display
    priceRange.addEventListener("input", () => {
      priceValue.textContent = `$${priceRange.value}`;
      filterProducts();
    });
  
    // Filter products by category
    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        filterProducts(category);
      });
    });
  
    // Toggle cart visibility
    cartToggle.addEventListener("click", () => {
      cart.classList.toggle("active");
    });
  
    // Add to cart functionality
    productGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const productId = e.target.getAttribute("data-id");
        const product = products.find(p => p.id == productId);
        addToCart(product);
      }
    });
  
    // Remove from cart functionality
    cartItems.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-from-cart")) {
        const productId = e.target.getAttribute("data-id");
        removeFromCart(productId);
      }
    });
  
    function filterProducts(category = "all") {
      const filteredProducts = products.filter(product => {
        const withinPriceRange = product.price <= priceRange.value;
        const matchesCategory = category === "all" || product.category === category;
        return withinPriceRange && matchesCategory;
      });
      displayProducts(filteredProducts);
    }
  
    function displayProducts(products) {
      productGrid.innerHTML = "";
      products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
          <img src="images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
      });
    }
  
    function addToCart(product) {
      const existingItem = cartData.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartData.push({ ...product, quantity: 1 });
      }
      updateCart();
    }
  
    function removeFromCart(productId) {
      cartData = cartData.filter(item => item.id != productId);
      updateCart();
    }
  
    function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;
      cartData.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <img src="images/${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price} x ${item.quantity}</p>
          </div>
          <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
      });
      cartCount.textContent = cartData.length;
      cartTotal.textContent = total.toFixed(2);
    }
  });
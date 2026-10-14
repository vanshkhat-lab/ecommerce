let allProducts = [];

async function loadProducts() {
  const container = document.getElementById("products");
  const message = document.getElementById("products-message");

  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed");
    }

    allProducts = await response.json();
    renderProducts(allProducts);
  } catch {
    message.textContent = "Could not load products. Make sure the backend and MongoDB are running.";
  }
}

function renderProducts(products) {
  const container = document.getElementById("products");

  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  container.innerHTML = products.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <p class="eyebrow">${product.category}</p>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Stock: ${product.stock}</p>
        <p class="price">${money(product.price)}</p>
        <button class="button" onclick="addToCart('${product._id}')"
          ${product.stock === 0 ? "disabled" : ""}>
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const product = allProducts.find(item => item._id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.productId === product._id);

  if (existing) {
    if (existing.quantity < product.stock) {
      existing.quantity += 1;
    }
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock
    });
  }

  saveCart(cart);
  alert("Product added to cart");
}

document.getElementById("search-input").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  renderProducts(filtered);
});

loadProducts();

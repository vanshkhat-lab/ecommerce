async function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");

  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    container.innerHTML = products.slice(0, 4).map(product => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">${money(product.price)}</p>
          <a class="button" href="products.html">Shop</a>
        </div>
      </article>
    `).join("");
  } catch {
    container.innerHTML = "<p>Could not load products. Start the backend first.</p>";
  }
}

loadFeaturedProducts();

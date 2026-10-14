function renderCart() {
  const container = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty. <a href='products.html'>Shop now</a>.</p>";
    summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-row">
      <img src="${item.image}" alt="${item.name}">
      <div class="grow">
        <h3>${item.name}</h3>
        <p>${money(item.price)}</p>
      </div>

      <div class="quantity-controls">
        <button class="button secondary" onclick="changeQuantity(${index}, -1)">-</button>
        <strong>${item.quantity}</strong>
        <button class="button secondary" onclick="changeQuantity(${index}, 1)">+</button>
      </div>

      <button class="button" onclick="removeItem(${index})">Remove</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  summary.innerHTML = `
    <h2>Total: ${money(total)}</h2>
    <a class="button" href="checkout.html">Proceed to Checkout</a>
  `;
}

function changeQuantity(index, amount) {
  const cart = getCart();
  const item = cart[index];

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }

  if (item.quantity > item.stock) {
    item.quantity = item.stock;
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

renderCart();

function requireLogin() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

function renderTotal() {
  const total = getCart().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.getElementById("checkout-total").textContent =
    `Order total: ${money(total)}`;
}

document.getElementById("checkout-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cart = getCart();
  const message = document.getElementById("message");

  if (cart.length === 0) {
    message.textContent = "Your cart is empty.";
    return;
  }

  message.textContent = "Placing order...";

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: document.getElementById("fullName").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          pincode: document.getElementById("pincode").value
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Order failed");
    }

    localStorage.removeItem("cart");

    message.textContent = "Booking/order placed successfully!";
    window.setTimeout(() => {
      window.location.href = "orders.html";
    }, 800);
  } catch (error) {
    message.textContent = error.message;
  }
});

requireLogin();
renderTotal();

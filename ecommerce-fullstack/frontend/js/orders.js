async function loadOrders() {
  const container = document.getElementById("orders");

  if (!getToken()) {
    container.innerHTML = "<p>Please <a href='login.html'>login</a> to view your orders.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });

    const orders = await response.json();

    if (!response.ok) {
      throw new Error(orders.message || "Could not load orders");
    }

    if (orders.length === 0) {
      container.innerHTML = "<p>You have no orders yet.</p>";
      return;
    }

    container.innerHTML = orders.map(order => `
      <article class="order-card">
        <h3>Order #${order._id.slice(-8)}</h3>
        <p>Status: <strong>${order.status}</strong></p>
        <p>Total: <strong>${money(order.totalAmount)}</strong></p>
        <p>${new Date(order.createdAt).toLocaleString()}</p>
        <ul>
          ${order.items.map(item =>
            `<li>${item.name} × ${item.quantity}</li>`
          ).join("")}
        </ul>
      </article>
    `).join("");
  } catch (error) {
    container.innerHTML = `<p>${error.message}</p>`;
  }
}

loadOrders();

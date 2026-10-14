const API_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  countElement.textContent = count;
}

function setupNavbar() {
  const user = getUser();
  const loginLink = document.getElementById("login-link");
  const logoutButton = document.getElementById("logout-btn");

  if (user && loginLink) {
    loginLink.classList.add("hidden");
  }

  if (user && logoutButton) {
    logoutButton.classList.remove("hidden");
    logoutButton.addEventListener("click", logout);
  }
}

function money(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

updateCartCount();
setupNavbar();

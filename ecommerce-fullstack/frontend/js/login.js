document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.getElementById("message");
  message.textContent = "Logging in...";

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "products.html";
  } catch (error) {
    message.textContent = error.message;
  }
});

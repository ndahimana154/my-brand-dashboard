document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();

    var usernameError = document.getElementById("usernameError");
    var passwordError = document.getElementById("passwordError");

    usernameError.textContent = "";
    passwordError.textContent = "";

    // Validate username (improvements based on suggestions)
    if (username === "") {
      usernameError.textContent = "Username can't be empty";
    }

    // Validate password (consider complexity requirements)
    if (password === "") {
      passwordError.textContent = "Password can't be empty";
    }

    // If no validation errors, proceed with login
    if (!usernameError.textContent && !passwordError.textContent) {
      try {
        const response = await fetch("https://my-brand-backend-server.onrender.com/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json(); // Assuming the response contains a token and username

        // Store token and username securely in session storage (not local storage)
        sessionStorage.setItem("accessToken", data.token);
        sessionStorage.setItem("username", data.username);

        alert("Login successful!");

        // Optionally redirect to a logged-in user page
        window.location.href = "./admin-home.html"; // Replace with your desired redirect URL
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Login failed: " + error.message);
      }
    }
  });

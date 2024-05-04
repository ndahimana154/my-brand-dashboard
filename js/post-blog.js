document.addEventListener("DOMContentLoaded", function () {
  // Access token
  const accessToken = sessionStorage.getItem("accessToken");

  // Username
  const username = sessionStorage.getItem("username");


  // Logout
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("username");
      window.location.href = "./signin.html";
  });

  // Check if access token exists
  if (!accessToken || !username) {
      window.location.href = "./signin.html";
  }

  const profileSection = document.getElementById("actingProfile");
  profileSection.innerHTML = `<a href="./admin-profile.html">${username}</a>`;

  // New Blog Form
  const loadingRing = document.querySelector('.center'); // Select the first element with class 'center'

  const newBlogForm = document.getElementById("new-blog-form");
  newBlogForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      loadingRing.style.display = "block"; // Show loading indicator
      try {
          // Gather form data including files
          const formData = new FormData(newBlogForm);

          // Send POST request to backend
          const response = await fetch("https://my-brand-backend-server.onrender.com/api/blog/", {
              method: "POST",
              headers: {
                  Authorization: `${accessToken}`,
              },
              body: formData, // Pass the FormData object directly as the body
          });

          const json = await response.json();

          if (response.status === 201) {
              // Reset form inputs
              newBlogForm.reset();
              alert("Blog created successfully");
          } else {
              alert("Blog not created");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while creating the blog.");
      } finally {
          loadingRing.style.display = "none"; // Hide loading indicator
      }
  });
});

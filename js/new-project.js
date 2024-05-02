const newProjectForm = document.getElementById("new-project-form");

newProjectForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const loadingRing = document.querySelector(".center"); // Select the first element with class 'center'
  loadingRing.style.display = "block"; // Show loading indicator

  // Retrieve input values from the form fields
  const formData = new FormData(newProjectForm);

  try {
    const response = await fetch(
      "https://my-brand-backend-server.onrender.com/api/project",
      {
        method: "POST",
        headers: {
          //   "Content-Type": "application/json",
        },
        body: formData,
      }
    );
    const data = await response.json();

    if (data.success) {
      alert(data.message);
      newProjectForm.reset();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while sending the message");
  } finally {
    loadingRing.style.display = "none"; // Hide loading indicator
  }
});

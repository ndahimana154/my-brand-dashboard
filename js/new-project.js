const newProjectForm = document.getElementById("new-project-form");

newProjectForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Retrieve input values from the form fields
  const formData = new FormData(newProjectForm);

  await fetch("https://my-brand-backend-server.onrender.com/api/project", {
    method: "POST",
    headers: {
      //   "Content-Type": "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message);
        newProjectForm.reset();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while sending the message");
    });
});




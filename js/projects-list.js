// Function to show loading ring
const showLoadingRing = () => {
  const loadingDiv = document.querySelector(".center");
  loadingDiv.style.display = "flex";
};

// Function to hide loading ring
const hideLoadingRing = () => {
  const loadingDiv = document.querySelector(".center");
  loadingDiv.style.display = "none";
};

// Select the tbody element where the project rows will be added
const projectsTableBody = document.getElementById("projectsTableBody");
// Select the loading div
const loadingDiv = document.querySelector(".center");

// Function to fetch projects from the server and populate the table
async function fetchProjects() {
  try {
    // Show loading rings initially
    loadingDiv.style.display = "flex";

    // Make a GET request to the endpoint
    const response = await fetch(
      "https://my-brand-backend-server.onrender.com/api/project"
    );

    // Check if response is successful
    if (response.ok) {
      const projects = await response.json(); // Parse JSON response
      // Clear existing table rows
      projectsTableBody.innerHTML = "";

      // Iterate over the projects and create table rows
      projects.data.forEach((project, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${project.title}</td>
            <td>${project.description}</td>
            <td><img src="${project.image}" alt="Project Image"></td>
            <td>
              <button onclick="">Edit</button>
              <button class="delete-project" value="${
                project._id
              }">Delete</button>
            </td>
          </tr>
        `;
        // Append the row to the table body
        projectsTableBody.innerHTML += row;
      });
    } else {
      // Handle non-successful response
      throw new Error(
        `Failed to fetch projects: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching projects");
  } finally {
    // Hide loading rings after the project list is fetched and displayed, or if an error occurs
    loadingDiv.style.display = "none";
  }
}
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-project")) {
    showLoadingRing();
    const projectId = e.target.value;
    showLoadingRing();

    // Send DELETE request to delete the project
    const response = await fetch(
      `https://my-brand-backend-server.onrender.com/api/project/${projectId}`,
      {
        method: "DELETE",
      }
    );
    
    // Check if the request was successful
    if (response.ok) {
      // If successful, fetch and populate blog comments table again
      await fetchProjects();
      alert("Project deleted successfully!");
    } else {
      // If not successful, display error message
      alert("Failed to delete project. Please try again later.");
    }

    // Hide loading ring after request is completed
    hideLoadingRing().catch(error => {
      console.error("Error:", error);
      // Hide loading ring if an error occurs
      hideLoadingRing();
      alert("An error occurred while deleting project. Please try again later.");
    });
  }
});


// Call the fetchProjects function when the page loads
window.addEventListener("load", fetchProjects);

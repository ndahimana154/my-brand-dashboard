// Select the tbody element where the project rows will be added
const projectsTableBody = document.getElementById("projectsTableBody");

// Function to fetch projects from the server and populate the table
async function fetchProjects() {
  try {
    // Make a GET request to the endpoint
    const response = await fetch("https://my-brand-backend-server.onrender.com/api/project");

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
              <button onclick="editProject(${project.id})">Edit</button>
              <button onclick="deleteProject(${project.id})">Delete</button>
            </td>
          </tr>
        `;
        // Append the row to the table body
        projectsTableBody.innerHTML += row;
      });
    } else {
      // Handle non-successful response
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching projects");
  }
}

// Function to delete a project
async function deleteProject(projectId) {
  try {
    const response = await fetch(`https://my-brand-backend-server.onrender.com/api/project/${projectId}`, {
      method: "DELETE",
    });

    // Check if response is successful
    if (response.ok) {
      // Refresh the projects list after deletion
      fetchProjects();
      alert("Project deleted successfully");
    } else {
      // Handle non-successful response
      throw new Error(`Failed to delete project: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while deleting the project");
  }
}

// Call the fetchProjects function when the page loads
window.addEventListener("load", fetchProjects);

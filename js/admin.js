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

  // Get all Blogs
  const getBlogs = async () => {
    try {
      // Send GET request to fetch blogs data
      const response = await fetch("https://my-brand-backend-5cne.onrender.com/api/blog");

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      // Extract JSON data from the response
      const json = await response.json();
      const blogs = json.data;

      // Dynamically generate HTML to display the blogs
      const blogRow = document.getElementById("blogRow");
      blogRow.innerHTML = ""; // Clear previous content

      if (blogs.length < 1) {
        blogRow.innerHTML = "No blogs found.";
      } else {
        blogs.forEach((blog) => {
          const blogBox = document.createElement("div");
          blogBox.classList.add("list-box");

          // Create an img element with the src attribute set to the blog's cover image URL
          const img = document.createElement("img");
          img.src = "/uploads/blogs/"+blog.cover;
          blogBox.appendChild(img);

          // Add other blog details
          blogBox.innerHTML += `
                  <h3>${blog.title}</h3>
                  <p>${blog.summary}</p>
                  <span>${blog.postedAt}</span>
                  <div class="ctrz">
                      <button>
                          <i class="fa fa-arrow-right"></i>
                          Read more
                      </button>
                      <button onclick="window.location.href='admin-edit-blog.html'">
                          <i class="fa fa-edit"></i>
                          Edit
                      </button>
                      <button class="delete" value="${blog._id}" onclick="">
                          <i class="fa fa-trash"></i>
                          Delete
                      </button>
                  </div>
              `;
          blogRow.appendChild(blogBox);
        });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  // Call the getBlogs function to fetch and display the blogs
  getBlogs();

  // Delete Blog Operations
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete")) {
      const blogId = e.target.value;

      try {
        const response = await fetch(
          `http://localhost:3301/api/blog/${blogId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        alert("Blog deleted successfully");
        // Optionally, you can reload the blogs after deletion
        getBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error.message);
      }
    }
  });

  {
    /* <button value="${task._id}" class="delete-btn">
<img src="./images/bin.png" alt="Delete" 
  data-taskid="${task._id}">
</button>


// Get all delete buttons with the class "delete-btn"
    const deleteButtons = document.querySelectorAll(".delete-btn");

    // Loop through each delete button and attach event listener
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const taskId = event.target.dataset.taskid;
        handleDelete(taskId);
      });
    });

// Function to handle task deletion
  async function handleDelete(taskId) {
    try {
      const response = await fetch(
        `http://localhost:3302/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      alert("Deleted successfully");
      fetchTasks(); // Fetch tasks again to update the list
    } catch (error) {
      alert(error.message);
    }
  } */
  }
});

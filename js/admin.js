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
    const loadingRing = document.querySelector(".center"); // Select the first element with class 'center'
    loadingRing.style.display = "block"; // Show loading indicator

    try {
      // Send GET request to fetch blogs data
      const response = await fetch(
        "https://my-brand-backend-server.onrender.com/api/blog"
      );

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
          // Convert date string to Date object
          const blogDate = new Date(blog.postedAt);

          // Format date string (e.g., "April 22, 2024, 20:08:32")
          const formattedPostedAt = blogDate.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });

          const blogBox = document.createElement("div");
          blogBox.classList.add("list-box");

          // Create an img element with the src attribute set to the blog's cover image URL
          const img = document.createElement("img");
          img.src = blog.cover;
          blogBox.appendChild(img);

          // Add other blog details
          blogBox.innerHTML += `
                        <h3>${blog.title}</h3>
                        <p>${blog.summary}</p>
                        <span>${formattedPostedAt}</span>
                        <div class="ctrz">
                            <a target="_blank"
                            href="https://ndahimana154.github.io/my-brand/blogfull.html?id=${blog._id}">
                                <i class="fa fa-arrow-right"></i>
                                Read more
                            </a>
                            <button onclick="window.location.href='admin-edit-blog.html?id=${blog._id}'">
                                <i class="fa fa-edit"></i>
                                Edit
                            </button>
                            <button onclick="window.location.href='admin-blog-comments.html?id=${blog._id}'">
                                <i class="fa fa-eye"></i>
                                Comments
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
    } finally {
      loadingRing.style.display = "none"; // Hide loading indicator
    }
  };

  // Call the getBlogs function to fetch and display the blogs
  getBlogs();

  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete")) {
      const blogId = e.target.value;
      const loadingRing = document.querySelector(".center"); // Select the first element with class 'center'
      loadingRing.style.display = "block"; // Show loading indicator

      try {
        const response = await fetch(
          `https://my-brand-backend-server.onrender.com/api/blog/${blogId}`,
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
      } finally {
        loadingRing.style.display = "none"; // Hide loading indicator
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

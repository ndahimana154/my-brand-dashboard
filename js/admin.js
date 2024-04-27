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
    const response = await fetch("http://localhost:3301/api/blog/");

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

    blogs.forEach((blog) => {
      const blogBox = document.createElement("div");
      blogBox.classList.add("list-box");
      blogBox.innerHTML = `
        <img src="">
          <h3>${blog.title}</h3>
          <span>${blog.postedAt}</span>
          
        `;
      blogRow.appendChild(blogBox);
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

// Call the getBlogs function to fetch and display the blogs
getBlogs();

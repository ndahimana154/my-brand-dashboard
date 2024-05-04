// Function to extract blog ID from URL parameters
const getBlogIdFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

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

// Function to fetch blog comments from the backend and populate the table
const fetchBlogCommentsAndPopulateTable = async () => {
  try {
    // Show loading ring while fetching data
    showLoadingRing();

    const blogId = getBlogIdFromURL();
    if (!blogId) {
      console.error("Blog ID not found in URL parameters.");
      return;
    }

    const response = await fetch(
      `https://my-brand-backend-server.onrender.com/api/comment/${blogId}`
    );
    const comments = await response.json();

    const blogCommentsTable = document.getElementById("blogComments");
    blogCommentsTable.innerHTML = ""; // Clear existing table rows
    console.log(comments);
    if (comments.blogComments.length < 1) {
      const row = `
            <tr>
                <td colspan="100">No data found</td>
            </tr>
        `;
      blogCommentsTable.innerHTML = row;
    } else {
      comments.blogComments.forEach((comment, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${comment.firstname}</td>
                    <td>${comment.lastname}</td>
                    <td>${comment.comment}</td>
                    <td>${comment.commentedAt}</td>
                    <td>${comment.status}</td>
                    <td>
                        <button>
                        <i class="fa fa-check"></i>
                        </button>
                        <!-- Add actions buttons here if needed -->
                    </td>
                </tr>
            `;
        // Append the row to the table body
        blogCommentsTable.innerHTML += row;
      });
    }

    // Hide loading ring after data is fetched and table is populated
    hideLoadingRing();
  } catch (error) {
    console.error("Error:", error);
    // Hide loading ring if an error occurs
    hideLoadingRing();
  }
};

// Call the function to fetch blog comments and populate the table when the page loads
window.addEventListener("load", fetchBlogCommentsAndPopulateTable);

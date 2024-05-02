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

// Function to handle form submission and update the blog
const handleFormSubmit = async (event) => {
  event.preventDefault();

  try {
      const id = getBlogIdFromURL();
      if (!id) {
          console.error("Blog ID not found in URL parameters.");
          return;
      }

      showLoadingRing();

      const title = document.getElementById("title").value.trim();
      const summary = document.getElementById("summary").value.trim();
      const fullText = document.getElementById("fullText").value.trim();

      const formData = {
          title: title,
          summary: summary,
          fullText: fullText,
      };

      const response = await fetch(
          `https://my-brand-backend-server.onrender.com/api/blog/${id}`,
          {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          }
      );

      hideLoadingRing();

      const data = await response.json();
      if (!data.success) {
          throw new Error(data.message);
      }

      alert("Blog updated successfully!");
      window.location.href="./admin-blog-list.html"
  } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while updating the blog.");
  }
};

// Function to fetch blog data from the backend and populate form fields
const fetchDataAndPopulateForm = async () => {
  try {
      // Show loading ring while fetching data
      showLoadingRing();

      const id = getBlogIdFromURL();
      if (!id) {
          console.error("Blog ID not found in URL parameters.");
          return;
      }

      const response = await fetch(
          `https://my-brand-backend-server.onrender.com/api/blog/${id}`
      );
      const blogData = await response.json();
      if (blogData) {
          const { title, summary, article, coverImage } = blogData.data;

          document.getElementById("title").value = title;
          document.getElementById("summary").value = summary;
          document.getElementById("fullText").value = article;
          // You might need additional logic to handle cover image display or upload

          // Hide loading ring after data is fetched and populated
          hideLoadingRing();
      } else {
          alert("Blogging data not found!");
      }
  } catch (error) {
      console.error("Error:", error);
      // Hide loading ring if an error occurs
      hideLoadingRing();
  }
};

// Add event listener for form submission
const editBlogForm = document.getElementById("editBlogForm");
editBlogForm.addEventListener("submit", handleFormSubmit);

// Usage
fetchDataAndPopulateForm();

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Extract the blog ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    // If the blog ID is present in the URL
    if (blogId) {
      // Fetch the specific blog content using the ID
      const response = await fetch(`https://my-brand-backend-server.onrender.com/api/blog/${blogId}`);
      const data = await response.json();

      // Log the data object to the console for debugging
      console.log("Blog data:", data);

      // Update the elements with the retrieved blog content
      document.querySelector(".article-section h2").textContent = data.data.title;
      document.querySelector(".article-section .img img").src = `./images/${data.data.cover}`;
      document.querySelector(".article-section .author span").textContent = data.data.author;
      document.querySelector(".article-section .time span").textContent = data.data.postedAt;
      document.querySelector(".article-section .overview").textContent = data.data.summary;
      document.querySelector(".article-section .full").innerHTML = data.data.article;
    } else {
      console.error("Blog ID not found in the URL");
    }
  } catch (error) {
    console.error("Error fetching blog content:", error.message);
  }
});

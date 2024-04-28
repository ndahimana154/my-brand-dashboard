const getTotalBlogs = async () => {
  try {
    const response = await fetch(
      "https://my-brand-backend-5cne.onrender.com/api/blog/"
    );
    const data = await response.json();

    const blogTotalSection = document.getElementById("blogsTotal");

    const dataArr = data.data;
    blogTotalSection.innerHTML = `${dataArr.length}`;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

getTotalBlogs();

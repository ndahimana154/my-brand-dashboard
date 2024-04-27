const getTotalBlogs = async () => {
  try {
    const response = await fetch(
      "http://localhost:3301/api/blog/"
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
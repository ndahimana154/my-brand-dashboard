const getTotalBlogs = async () => {
  try {
    const response = await fetch(
      "https://my-brand-backend-server.onrender.com/api/blog/"
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





const getTotalMessages = async()=> {
  try {
    const response = await fetch("https://my-brand-backend-server.onrender.com/api/message");
    const data= await response.json()
    console.log(data)
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    
  }
}

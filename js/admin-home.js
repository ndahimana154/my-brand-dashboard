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
const getTotalProjects = async () => {
  try{
  const response = await fetch(
    "https://my-brand-backend-server.onrender.com/api/project"
  );
  const data = await response.json();
  const projectsTotalSection = document.getElementById("projectsTotal");

  const dataArr = data.data;
  projectsTotalSection.innerHTML = dataArr.length;
} catch (error) {
  console.error("Error fetching messages:", error.message);
}
};
const getTotalMessages = async () => {
  try {
    const response = await fetch(
      "https://my-brand-backend-server.onrender.com/api/message"
    );
    const data = await response.json();
    const messagesTotalSection = document.getElementById("messagesTotal");

    const dataArr = data.messagesData;
    messagesTotalSection.innerHTML = dataArr.length;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
  }
};

getTotalBlogs();
getTotalProjects();
getTotalMessages();

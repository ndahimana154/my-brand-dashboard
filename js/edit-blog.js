// Function to extract blog ID from URL parameters
const getBlogIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };
  
  // Function to fetch blog data from the backend and populate form fields
  const fetchDataAndPopulateForm = async () => {
    try {
      const id = getBlogIdFromURL();
      if (!id) {
        console.error('Blog ID not found in URL parameters.');
        return;
      }
  
      const response = await fetch(`https://my-brand-backend-server.onrender.com/api/blog/${id}`);
      const blogData = await response.json();
  
      if (blogData) {
        const { title, summary, fullText, coverImage } = blogData;
        document.querySelector('input[name="title"]').value = title;
        document.querySelector('input[name="summary"]').value = summary;
        document.querySelector('textarea[name="fullText"]').value = fullText;
        // You might need additional logic to handle cover image display or upload
      } else {
        console.log('Blog data not found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Usage
  fetchDataAndPopulateForm();
  
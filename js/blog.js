window.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:3301/api/blog/');
      const data = await response.json();
      const blogRow = document.getElementById('blogRow');

      if (data.success && data.data) {
        data.data.forEach(blog => {
          const blogBox = document.createElement('a');
          blogBox.href = `./blogfull.html?id=${blog._id}`; // Set the href according to your needs
          blogBox.classList.add('blog-box');

          const imgDiv = document.createElement('div');
          imgDiv.classList.add('img');

          const img = document.createElement('img');
          img.src = blog.cover; // Assuming 'cover' is the field containing the image URL
          img.alt = 'Blog Image';

          imgDiv.appendChild(img);

          const infoDiv = document.createElement('div');
          infoDiv.classList.add('info');

          const h5 = document.createElement('h5');
          h5.textContent = blog.title;

          const p = document.createElement('p');
          p.textContent = blog.summary; // Assuming 'summary' is the field containing the blog summary

          const authorDiv = document.createElement('div');
          authorDiv.classList.add('author');

          const authorIcon = document.createElement('i');
          authorIcon.classList.add('fa', 'fa-user-circle');

          const authorSpan = document.createElement('span');
          authorSpan.textContent = blog.author; // Assuming 'author' is the field containing the author name

          authorDiv.appendChild(authorIcon);
          authorDiv.appendChild(authorSpan);

          // Similarly, create elements for time

          infoDiv.appendChild(h5);
          infoDiv.appendChild(p);
          infoDiv.appendChild(authorDiv);
          // Append other elements for time

          blogBox.appendChild(imgDiv);
          blogBox.appendChild(infoDiv);

          blogRow.appendChild(blogBox);
        });
      } else {
        console.error('Failed to fetch blogs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  });
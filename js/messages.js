document.addEventListener("DOMContentLoaded", function () {
  const fetchMessages = async () => {
    try {
      const response = await fetch("https://my-brand-backend-server.onrender.com/api/message");
      const data = await response.json();
      console.log(data);

      const messageTableBody = document.getElementById("messageTableBody");
      // Clear existing table rows
      messageTableBody.innerHTML = "";

      // Loop through the fetched data and create table rows
      data.messagesData.forEach((message, index) => {
        // Convert date string to Date object
        const sentAtDate = new Date(message.sentAt);

        // Format date string (e.g., "Apr 22, 2024, 8:08:32 PM")
        const formattedSentAt = sentAtDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${formattedSentAt}</td>
              <td>${message.firstname}</td>
              <td>${message.lastname}</td>
              <td>${message.email}</td>
              <td>${message.message}</td>
              <td>
                <button value="${message._id}" class="delete delete-message">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          `;
        // Append the row to the table body
        messageTableBody.insertAdjacentHTML("beforeend", row);
      });

      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll(".delete-message");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
          const messageId = event.target.value;
          try {
            const response = await fetch(
              `https://my-brand-backend-server.onrender.com/api/message/${messageId}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              // Remove the corresponding table row if the message is deleted successfully
              event.target.closest("tr").remove();
              alert("Message deleted successfully");
              fetchMessages();
            } else {
              alert("Failed to delete message");
            }
          } catch (error) {
            console.error("Error deleting message:", error.message);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  fetchMessages();
});

var valuesArray = [];

// Function to reset form fields and error messages
function resetFormFields() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";

  document.getElementById("firstnameError").textContent = "";
  document.getElementById("lastnameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";
}

function validateContactForm(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form fields' values
  var firstname = document.getElementById("firstname").value.trim();
  var lastname = document.getElementById("lastname").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  // Get error elements
  var firstnameError = document.getElementById("firstnameError");
  var lastnameError = document.getElementById("lastnameError");
  var emailError = document.getElementById("emailError");
  var messageError = document.getElementById("messageError");

  // Reset previous error messages
  firstnameError.textContent = "";
  lastnameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // Check for empty fields
  if (!firstname) {
    firstnameError.textContent = "Firstname is required";
  } else if (!isValidName(firstname)) {
    firstnameError.textContent =
      "Firstname cannot contain numbers or special characters";
  }

  if (!lastname) {
    lastnameError.textContent = "Lastname is required";
  } else if (!isValidName(lastname)) {
    lastnameError.textContent =
      "Lastname cannot contain numbers or special characters";
  }

  if (!email) {
    emailError.textContent = "Email is required";
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address";
  }

  if (!message) {
    messageError.textContent = "Message is required";
  }

  // If there are no errors, send the form data to the backend
  if (
    !firstnameError.textContent &&
    !lastnameError.textContent &&
    !emailError.textContent &&
    !messageError.textContent
  ) {
    var formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      message: message,
    };

    fetch("https://my-brand-backend-server.onrender.com/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          // You can do further actions here if needed
          resetFormFields();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while sending the message");
      });
  }
}

function isValidEmail(email) {
  var emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  var nameRegex = /^[a-zA-Z\s]*$/;
  return nameRegex.test(name);
}

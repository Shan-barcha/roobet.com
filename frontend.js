document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
  
    if (signupForm) {
      signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const email = document.getElementById('auth-dialog-emailaddress').value;
        const username = document.getElementById('auth-dialog-username').value;
        const phoneNumber = document.getElementById('auth-dialog-PhoneNumber').value;
        const password = document.getElementById('auth-dialog-Password').value;
  
        const data = {
          email: email,
          username: username,
          phoneNumber: phoneNumber,
          password: password
        };
  
        // Send a POST request to the backend
        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Handle success, e.g., show a success message to the user
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle errors, e.g., show an error message to the user
        });
      });
    }
  });
  
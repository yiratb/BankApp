document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        password: formData.get('password'),
        phone: formData.get('phone'),
        gmail: formData.get('gmail')
    };

    fetch('http://localhost:3000/signup', //send http request
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log (result);
        localStorage.setItem("userId", result.userId);
        window.location.href = '/bank/frontend/verify.html';
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Signup failed. Please try again.';
        console.log(error);
    });
});

document.getElementById('backButton').addEventListener('click', function() {
    window.history.back(); // Go back to the previous page
});

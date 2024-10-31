document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const data = {
        password: formData.get('password'),
        gmail: formData.get('gmail')
    };

    fetch('http://localhost:3000/signin', // Send signin request
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.token) {
            localStorage.setItem('token', result.token);
            document.getElementById('message').textContent = 'Signin successful!';
            window.location.href = '/bank/frontend/dashboard.html';
        }else {
            document.getElementById('message').textContent = result.message || 'Signin failed. Please try again.';
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Signin failed. Please try again.';
        console.log(error);
    });
});
// Handle verification form submission
document.getElementById('verifyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const verificationCode = document.getElementById('verificationCode').value;

    fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationCode, id: localStorage.getItem('userId')})
    })
    .then(response => {
        if (response.status === 200) {
            window.location.href = '/bank/frontend/signin.html';
        }
        return response.json();
    })
    .then(result => {
        document.getElementById('message').textContent = result.message || 'Verification successful!';
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Verification failed. Please try again.';
        console.log(error);
    });
});

// Handle resend email button click
document.getElementById('resendEmail').addEventListener('click', function() {
    fetch('http://localhost:3000/resendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       body: JSON.stringify({ id: localStorage.getItem('userId') })
     })
    .then(response => response.json())
    .then(result => {
        document.getElementById('message').textContent = result.message || 'Verification email resent!';
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Failed to resend email. Please try again.';
        console.log(error);
    });
});

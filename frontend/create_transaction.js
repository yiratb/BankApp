document.getElementById('transactionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const gmail = document.getElementById('gmail').value;
    const amount = document.getElementById('amount').value;

    const token = localStorage.getItem('token'); // Assume you save the token in local storage
    console.log("Token:", token); // Log the token for debugging

    try {
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ gmail, amount }),
        });

        const data = await response.json();
        document.getElementById('transactionMessage').innerText = data.message;

        if (response.ok) { // Check if the response is successful
            // Redirect to dashboard after transaction
            window.location.href = '/bank/frontend/dashboard.html';
        }

    } catch (error) {
        document.getElementById('transactionMessage').innerText = 'Error creating transaction';
        console.error('Error:', error);
    }
});
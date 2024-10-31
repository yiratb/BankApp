document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token'); // Assume you save the token in local storage

    try {
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const transactions = await response.json();
        const transactionList = document.getElementById('transactionList');

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            const sign = transaction.userRole === 'sender' ? '-' : '+';
            listItem.innerText = `Amount: ${transaction.amount},
                                 Date: ${new Date(transaction.date).toLocaleString()}, 
                                 Other Party: ${transaction.otherPartyName}`;
            // Set color based on sign
            listItem.style.color = sign === '+' ? 'green' : 'red';
            transactionList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    window.history.back(); // Go back to the previous page
});
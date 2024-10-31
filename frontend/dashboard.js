document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        const transactions = data.transactions;
        const balance = data.balance;
        const transactionList = document.getElementById('transactionList');
        const balanceElement = document.getElementById('balance');

        // Display balance
        balanceElement.innerText = `Your Balance: $${balance}`;

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            const sign = transaction.userRole === 'sender' ? '-' : '+';
            listItem.innerText = `Amount: ${sign}${transaction.amount}, 
                                Date: ${new Date(transaction.date).toLocaleString()},
                                Other Party: ${transaction.otherPartyName}`;
            listItem.style.color = sign === '+' ? 'green' : 'red';
            transactionList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
});

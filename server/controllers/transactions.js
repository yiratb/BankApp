//const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const User = require('../models/user'); // Import User model for reference

async function createTransaction(req, res) {
    /* const session = await mongoose.startSession(); // Start a new session
    session.startTransaction(); // Begin the transaction */

    try {
        const {gmail, amount} = req.body;

        if (gmail === req.user.gmail) {
            return res.status(400).json({ message: 'Illegal transfer to the same account' });
        }

        if (!gmail || !amount) {
            return res.status(400).json({ message: 'Invalid transaction data' });
        }

        const receiver = await User.findOne({ gmail: gmail });
        if (!receiver) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        const sender = await User.findById(req.user.id);

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        sender.balance -= amount;
        receiver.balance = receiver.balance + amount;

        const transaction = new Transaction({senderId: sender._id, receiverId: receiver._id, amount});
        
        await transaction.save(/* { session } */);
        await sender.save(/* { session } */);
        await receiver.save(/* { session } */);

        //await session.commitTransaction();

        res.status(201).json({
            message: 'Transaction completed successfully',
            transaction
        });
    } catch (error) {
        //await session.abortTransaction();
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }finally {
        //session.endSession(); // End the session
    }
}

async function getTransactions(req, res) {
    try{
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transactions = await Transaction.find({
            $or: [
                { senderId: req.user.id },
                { receiverId: req.user.id }
            ]
        })
        .sort({ date: -1}) // Sort by date, earliest first
        .populate('senderId', 'name')   // Populate sender's name
        .populate('receiverId', 'name'); // Populate receiver's name        

        const formattedTransactions = transactions.map(transaction => {
            const isSender = transaction.senderId._id.toString() === req.user.id;
            return {
                //converts a Mongoose document into a plain JavaScript object
                ...transaction.toObject(),
                userRole: isSender ? 'sender' : 'receiver',
                otherPartyName: isSender ? transaction.receiverId.name : transaction.senderId.name,
                //amount: isSender ? -transaction.amount : transaction.amount
            };
        });
        res.status(200).json({
            balance: user.balance,
            transactions: formattedTransactions 
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {createTransaction, getTransactions};
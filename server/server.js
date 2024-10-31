require('dotenv').config(); // Load environment variables from .env file

// Import required modules
const express = require('express'); // Import the Express module
const cors = require('cors');

const {signup, signin, verifyEmail, resendEmail} = require("./controllers/users")
const { createTransaction, getTransactions } = require("./controllers/transactions")
const authMiddleware = require('./middlewares/auth');

// Import Mongoose for MongoDB interactions and nodemailer for sending emails
const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb://localhost:27017/bank'; // Local MongoDB

const app = express(); // Create an instance of an Express application
const port = 3000; 

app.use(express.json()); // Parses the JSON body of incoming requests
app.use(cors()); // Allows front to access the server (backend)

// Open connection to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.post('/signup',signup);
app.post('/signin',signin);
app.post('/verify', verifyEmail);
app.post('/resendEmail', resendEmail);
app.post('/transactions',authMiddleware, createTransaction);
app.get('/transactions',authMiddleware, getTransactions);

// Start the server and listen on port 3000
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
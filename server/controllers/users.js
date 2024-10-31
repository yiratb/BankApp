const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/email_service');

const SECRET_KEY = process.env.SECRET_KEY || "My-Secret-code";

async function generateVerificationCode() {
    return crypto.randomBytes(3).toString('hex');
}

async function signup(req, res) {
    const {name, password, phone, gmail} = req.body;

    
    try {
        const verificationCode = await generateVerificationCode();
        const newUser = new User({ name, password, phone, gmail,verificationCode});
        
        await newUser.save()
        console.log(`User ${name} saved successfully.`);
        sendVerificationEmail(newUser.gmail, newUser.verificationCode);
        
        res.json({
            message: 'Signup successful. Please check your email for the verification code.',
            userId: newUser.id,
        });
    }
    catch(err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Error saving user.' });
    }
}

async function signin(req, res) {
    const {password, gmail} = req.body;

    try{
        const user = await User.findOne({ gmail, password });

        if (!user) {
            console.log('No user found.');
            return res.status(404).json({ message: 'No user found.' });
        }

        if (!user.isVerified) {
            console.log('User email not verified.');
            return res.status(403).json({ message: 'Please verify your email before signing in.' });
        }

        const user_token = { id: user._id, gmail: user.gmail };
        const token = jwt.sign(user_token, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token }); // Send response as JSON
    }
    catch (err){
        console.error('Error finding user:', err);
        res.status(500).json({ error: 'Error finding user.' }); // Send JSON error response
    }
}

async function verifyEmail(req, res) {
    const { verificationCode , id} = req.body; // Only verification code needed
    
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code.' });
        }

        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully.' });
    }

    catch (err) {
        console.error('Error verifying email:', err);
        res.status(500).json({ error: 'Error verifying email.' });
    }
}

async function resendEmail(req, res) {
    const {id} = req.body; // Only verification code needed

    try{ 
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        user.verificationCode = await generateVerificationCode();
        await user.save();
        sendVerificationEmail(newUser.gmail, newUser.verificationCode);

        console.log('Resent verification email.');
        res.json({ message: 'Verification email resent!' });

    } catch (err) {
        console.error('Error resending email:', err);
        res.status(500).json({ error: 'Error resending email.' });
    }
}

// Middleware to verify token for protected routes
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access token missing.');
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid or expired token.');
        }

        req.user = user; // Add user info to request object
        next(); // Continue to the next middleware or route handler
    });
}

module.exports = { signup, signin, verifyEmail, authenticateToken, resendEmail};

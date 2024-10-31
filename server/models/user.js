const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gmail: { type: String, required: true, unique: true },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },
    balance: { type: Number, default: 50 }
});

module.exports = mongoose.model('User', userSchema);

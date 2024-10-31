const nodemailer = require('nodemailer');
    
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendVerificationEmail(gmail, verificationCode) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: gmail,
        subject: 'Email Verification',
        text: `Your verification code is ${verificationCode}`
    };
    try {
        transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } 
    catch (err) {
        console.error('Error sending email:', err);
        throw new Error('Error sending verification email');
    }
}

module.exports = {sendVerificationEmail};
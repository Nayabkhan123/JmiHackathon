const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be your App Password
    },
});
// console.log("first",process.env.EMAIL_USER)
async function sendMail(to, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Your OTP for App',
        html: `
            <p>Dear User,</p>
            <p>Here is your OTP:</p>
            <h2><strong>${otp}</strong></h2>
            <p>Use this OTP to complete your registration. Do not share it with anyone.</p>
        `,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendMail;

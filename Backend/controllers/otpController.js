const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");

async function verifyOtp(req, res) {
    try {
        const { email, otp, password, name, profession, department, batch, location,profilePic } = req.body;
        const validOtp = await otpModel.findOne({ email, otp });
        if (!validOtp) throw new Error("Invalid or expired OTP");

        const newUser = await userModel.create({
            email, password, name, profession, department, batch, location, profilePic
        });

        // Delete OTP after successful registration
        await otpModel.deleteMany({ email });

        res.status(201).json({ success: true, message: "User registered successfully", data: newUser });
    } catch (err) {
        res.status(400).json({ success: false, error: true, message: err.message });
    }
}

module.exports = verifyOtp;

// const userModel = require("../models/userModel") 
// const bcrypt = require("bcryptjs")
// async function registerController(req,res){
//     try{
//         const {email,password,name,profession,department,batch,location} = req.body
//         const user = await userModel.findOne({email:email})
//         if(user){
//             throw new Error("User already exists")
//         }
//         if(!email){
//             throw new Error("please provide email")
//         }
//         if(!password){
//             throw new Error("please provide password")
//         }
//         if(!name){
//             throw new Error("please provide name")
//         }
//         const salt = bcrypt.genSaltSync(10);
//         var hashpassword = await bcrypt.hashSync(password,salt);

//         if(!hashpassword){
//             throw new Error("bcrypt error")
//         }

//         const payload = {
//             ...req.body,
//             password:hashpassword
//         }
//         const userData = new userModel(payload)
//         const saveUser = await userData.save();
//         res.status(201).json({
//             data: saveUser,
//             success: true,
//             error: false,
//             message: "User created Successfully"
//         })
        
//     }
//     catch(err){
//         res.json({
//             success: false,
//             error:true,
//             message:err.message || err
//         }) 
//     }
// }

// module.exports = registerController






const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
    try {
        const { email, password, name, profession, department, batch, location } = req.body;

        if (!email || !password || !name) throw new Error("Missing required fields");

        const existingUser = await userModel.findOne({ email });
        if (existingUser) throw new Error("User already exists");

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP
        await otpModel.create({ email, otp });

        // Send OTP to user's email
        await sendMail(email, otp);

        // Temporarily save user data in response or frontend state
        res.status(200).json({
            success: true,
            message: "OTP sent to email. Please verify to complete registration.",
            tempUser: { email, password: hashPassword, name, profession, department, batch, location},
            otp: otp
        });
    } catch (err) {
        res.status(400).json({ success: false, error: true, message: err.message });
    }
}

module.exports = registerController;

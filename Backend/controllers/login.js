const userModel = require("../models/userModel");
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");

async function userLoginController(req,res){
    try{
        const {email,password} = req.body;
        if(!email){
            throw new Error("Enter email")
        }
        if(!password){
            throw new Error("Enter password")
        }
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User Not Found")
        }
        const checkpassword =await bcrypt.compare(password,user.password);
        if(!checkpassword){
            throw new Error("Check Your Password, not matching")
        }
        const tokenData={
            email:user.email,
            password:password,
            _id:user._id,
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn: 8*60*60})

        const tokenOption = {
            httpOnly:true,
            secure:true,
        }
        res.cookie("token",token,tokenOption).status(200).json({
            data:token,
            success:true,
            error:false,
            some:req.cookies,
            message:"Login Successfully"
        })

    }
    catch(err){
        res.json({
            "success":false,
            "error":true,
            "message": err.message
        })

    }
}
module.exports = userLoginController
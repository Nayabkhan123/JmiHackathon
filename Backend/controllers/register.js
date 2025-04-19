const userModel = require("../models/userModel") 
const bcrypt = require("bcryptjs")
async function registerController(req,res){
    try{
        const {email,password,name} = req.body
        const user = await userModel.findOne({email:email})
        if(user){
            throw new Error("User already exists")
        }
        if(!email){
            throw new Error("please provide email")
        }
        if(!password){
            throw new Error("please provide password")
        }
        if(!name){
            throw new Error("please provide name")
        }
        const salt = bcrypt.genSaltSync(10);
        var hashpassword = await bcrypt.hashSync(password,salt);

        if(!hashpassword){
            throw new Error("bcrypt error")
        }

        const payload = {
            ...req.body,
            password:hashpassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save();
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully"
        })
        
    }
    catch(err){
        res.json({
            success: false,
            error:true,
            message:err.message || err
        }) 
    }
}

module.exports = registerController
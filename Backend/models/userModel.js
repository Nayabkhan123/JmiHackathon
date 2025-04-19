const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    profession:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    batch:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    },
    location:String,
},{
    timestamps:true,
})

const userModel=mongoose.model("user",userSchema)

module.exports = userModel 
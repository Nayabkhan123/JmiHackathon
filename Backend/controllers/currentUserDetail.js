const userModel = require("../models/userModel")

async function currentUserDetail(req,res) {
    try{
        const user= await userModel.findOne({_id:req.userid})
        console.log("user",user)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user Details"
        }) 
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:true,
            message:err.message || err
        })
    }
}
module.exports = currentUserDetail
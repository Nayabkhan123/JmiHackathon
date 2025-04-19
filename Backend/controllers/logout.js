async function userLogoutController(req,res){
    try{
        res.clearCookie("token");
        return res.status(200).json({
            success:true,
            error:false,
            message:"User Logout Successfully",
            data:[]
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            error:true,
            message:err.message||err,
        })
    }
}
module.exports=userLogoutController
const jwt = require('jsonwebtoken')
async function authToken(req,res,next){
    try{
        const token = req.cookies?.token
        
        if(!token){
            return res.status(400).json({
                message: "User not Login",
                error:true,
                success:false,
            })
        }
        
        jwt.verify(token,process.env.TOKEN_SECRET,function(err,decode){
            console.log(err)
            console.log("decoded ",decode)
            if(err){
                console.log("error auth" ,err)
            }
            req.userid = decode?._id
            next(); 
        })
        // console.log("token" ,token)
    }
    catch(err){
        res.status(400).json({
            success:false,
            data:[],
            error:true,
            message:err.message || err
        })
    }
}
module.exports=authToken
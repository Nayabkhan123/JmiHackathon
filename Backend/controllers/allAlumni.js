const userModel = require("../models/userModel")

async function allAlumni(req,res) {
    try{
        const totalAlumni = await userModel.find()
        res.status(200).json({
            data: totalAlumni,
            error: false,
            success: true,
            message: "user Details"
        }) 
    }
    catch(err){
        res.status(400).json({
            success: false,
            error: true,
            message: err.message || err
        })
    }
}
module.exports = allAlumni
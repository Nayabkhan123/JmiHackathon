const userModel = require("../models/userModel")

async function searchAlumni(req,res) {
    try{
        // const {inputData} = req.body 
        // if(inputData===""){
        //     const allAlumni = await userModel.find();
        
        //     res.json({
        //         message:"All Alumni",
        //         data:allAlumni,
        //         success:true,
        //         error:false
        //     })
        // }
        // else{
        //     const regex = new RegExp(inputData,'i','g')
        //     const matchedAlumni = await userModel.find({
        //         "$or":[
        //             {
        //                 name: regex
        //             }
        //         ]
        //     })
        //     res.status(200).json({
        //         data:matchedAlumni,
        //         error:false,
        //         success:true,
        //         message:"matchedAlumni Details"
        //     }) 
        // }



        const { inputData, filterOption } = req.body;

        if (!inputData || inputData.trim() === "") {
        const allAlumni = await userModel.find();
        return res.status(200).json({
            message: "All Alumni",
            data: allAlumni,
            success: true,
            error: false,
        });
        }

        const regex = new RegExp(inputData, 'i');

        let query = {};
        switch (filterOption) {
        case 'batch':
            query.batchYear = regex;
            break;

        case 'branch':
            query.branch = regex;
            break;

        case 'jobTitle':
            query.jobTitle = regex;
            break;

        case 'location':
            query.location = regex;
            break;

        default:
            query.name = regex;
            break;
        }

        const matchedAlumni = await userModel.find(query);

        return res.status(200).json({
        data: matchedAlumni,
        success: true,
        error: false,
        message: `Filtered by ${filterOption}`,
        });
    }
    catch(err){
        res.status(400).json({
            success:false,
            error:true,
            message:err.message || err
        })
    }
}
module.exports = searchAlumni
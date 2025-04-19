const mongoose = require("mongoose");
async function dbConnect() {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connection successfull")
    }
    catch(error){
        console.log(error)
    }
}
module.exports = dbConnect;
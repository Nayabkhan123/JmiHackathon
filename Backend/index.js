const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const dbConnect = require("./config/dbConnect")
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    
}));
const router = require('./routes');

app.use(express.json())

app.use("/api",router)



const PORT = 8000 || process.env.PORT
dbConnect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at port ${PORT}`)
    })
});

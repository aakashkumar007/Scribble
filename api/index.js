import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from "./routes/authRote.js";
// import morgan from "morgan";
// import connectDB from "./config/db.js";

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("DB connected");
}).catch(err => {console.error(err)});



const app = express();

//database config
// connectDB();

//middleware
app.use(express.json());
// app.use(morgan("dev"));

//routes
app.use("/api/auth", router);

app.get("/",(req,res) => {
    res.send({
        message:"Welocme to server"
    })
});

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server is running on port 4000");
});


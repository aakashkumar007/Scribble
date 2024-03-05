import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from "./routes/authRote.js";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
import cors from  "cors"

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("DB connected");
}).catch(err => {console.error(err)});



const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    credentials: true // Fix typo here
};

//database config
// connectDB();

//middleware
app.use(cors(corsOptions));



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


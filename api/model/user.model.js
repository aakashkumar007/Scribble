import mongoose, { mongo } from "mongoose";

 const userSchema = await new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:0
    }
},{timestamps:true});

export default mongoose.model("users", userSchema);

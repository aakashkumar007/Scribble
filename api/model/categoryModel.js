import mongoose, { Schema } from 'mongoose'

const categoryScheam= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },

    slug:{
        type:String,
        lowercase:true
    }
})

export  default mongoose.model('Category',categoryScheam)
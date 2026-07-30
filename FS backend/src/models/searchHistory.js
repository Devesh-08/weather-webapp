import mongoose from "mongoose";

const searchSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    city:String,
    searchedAt:{
        type:Date,
        default:Date.now
    }
})

export const Search=mongoose.model("Search",searchSchema)
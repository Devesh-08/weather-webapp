import mongoose from "mongoose";

const favouriteCitySchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    city:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

export const FavCity=mongoose.model("FavCity",favouriteCitySchema)
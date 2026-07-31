import mongoose from "mongoose";

const favouriteCitySchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    city:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

favouriteCitySchema.index(
    {
        user:1,
        city:1
    },
    {
        unique:true
    }
)

export const FavCity=mongoose.model("FavCity",favouriteCitySchema)
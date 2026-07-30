import { Search } from "../models/searchHistory.js";
import asyncHandler from "../utils/asynchandler.js";

export const getHistory=asyncHandler(async(req,res)=>{
        const history=await Search.find({user:req.user._id}).sort({createdAt:-1})

        res.status(200).json({history,message:"Successfully fetched the history of the user"})
})

export const  deleteHistory=asyncHandler(async (req,res)=>{
        const {id}=req.params;

        const item= await Search.findByIdAndDelete(id);

        return res
        .status(200)
        .json({
                item,message:"City deleted successfully"
        })
})
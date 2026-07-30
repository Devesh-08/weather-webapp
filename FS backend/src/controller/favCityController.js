import { FavCity } from "../models/favouriteCity.js";
import asyncHandler from "../utils/asynchandler.js";

export const addFavourite=asyncHandler(async(req,res)=>{
        const {city}=req.body

        if(!city){
            res.status(400)
            throw new Error("City is required")
        }

        const favourite=await FavCity.create({user:req.user._id,city})

        res.status(201).json({
            favourite,
            message:"Added to favourite city"
        })
})

export const getFavourites=asyncHandler(async (req,res)=>{
        // console.log(req.user);
        
        const favourites=await FavCity.find({user:req.user._id}).sort({createdAt:-1})

        res.status(200).json({favourites,message:"successfully fetched all cities"})
    })


export const deleteFavourite=asyncHandler(async(req,res)=>{
        const {id}=req.params;

        await FavCity.findByIdAndDelete(id)

        res.status(200).json({
            message:"favourite city deleted successfully"
        })
})
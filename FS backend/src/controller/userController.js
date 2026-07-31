import {User} from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asynchandler.js"
import {generateAccessToken,generateRefreshToken} from "../utils/generateToken.js"

const genearateAccessRefreshToken=async(userId)=>{
    try {
        const user= await User.findById(userId)

        const accessToken=generateAccessToken(userId)
        const refreshToken=generateRefreshToken(userId)
        
        await user.save({validataBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
        throw new Error("something went wrong while generating access and refresh Tokens")
    }
}

export const refreshToken=async(req,res)=>{
    const refreshToken=req.cookies?.refreshToken;

    if(!refreshToken){
        res.status(401)
        throw new Error("Refresh token required")
    }

    try {
        const decoded=jwt.verify(refreshToken,process.env.REFRESH_SECRET)
    
        const accessToken = generateAccessToken(decoded._id)

        res
        .cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:"production",
            sameSite:"lax",
        })
        .status(200)
        .json({accessToken})
    } catch (error) {
        res.status(403)
        throw new Error("Invalid refresh token")
    }
}

export const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please provide all filed")
    }

    const existUser = await User.findOne({email})

    if(existUser){
        res.status(400)
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user= await User.create({
        name,email,password:hashedPassword
    })

    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id),
        message:"User Created Successfully"})
})

export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user = await User.findOne({email})
    if(!user){
        throw new Error("user not found")
    }

    if(user && await bcrypt.compare(password,user.password)){

        const {accessToken,refreshToken}=await genearateAccessRefreshToken(user._id)
        const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

        const options={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }

        res
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({
            loggedInUser,
            accessToken,
            refreshToken,
            message:"Login successfully"
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// export const logoutUser=asyncHandler(async (req,res)=>{

//     await User.findByIdAndUpdate(req.user._id,{
//         $unset:{
//             refreshToken:1,
//         }
//     })

//     return res.status(200).json({
//         success:true,
//         message:"Logged out successfully"
//     })

// })
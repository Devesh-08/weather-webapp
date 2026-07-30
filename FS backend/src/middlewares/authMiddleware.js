import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import asyncHandler from "../utils/asynchandler.js";


// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.cookies?.accessToken||req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       if (!req.user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       return next();
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
// };

export const protect = asyncHandler(async(req,res,next)=>{
  try {
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    
    if(!token){
      throw new Error("UNauthorized access")
    }

    const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

    const user= await User.findById(decodedToken?._id).select("-password -refreshToken")

    if(!user){
      const err=new Error("Invalid access Token")
      err.statusCode=401;
      throw err;
    }

    req.user=user
    next()
  } catch (error) {
    return res.status(401).json({
      message:"invalid or expired token"
    })
  }
})

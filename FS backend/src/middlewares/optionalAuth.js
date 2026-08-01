import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return next(); // no user, just skip

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.
    _id).select("-password -refreshToken");
    console.log("optional user",user);
    
    if (user) {
      req.user = user; // attach user if valid
    }
    next();
  } catch {
    next(); // invalid token → treat as anonymous
  }
};

import express from "express";
import { loginUser, refreshToken, registerUser } from "../controller/userController.js";

const router=express.Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/refresh-token",refreshToken)

export default router
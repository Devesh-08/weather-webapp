import express, { Router } from "express"
import { deleteHistory, getHistory } from "../controller/searchHistoryController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router=Router()

router.get("/",protect,getHistory)
router.delete("/delete/:id",protect,deleteHistory)

export default router


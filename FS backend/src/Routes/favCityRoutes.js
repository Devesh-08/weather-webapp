import express, { Router } from "express"

import{addFavourite,getFavourites,deleteFavourite
} from "../controller/favCityController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router=Router()

router.post("/addFav",protect,addFavourite)
router.get("/getAllFavCity",protect, getFavourites)
router.delete("/:id",protect,deleteFavourite)

export default router
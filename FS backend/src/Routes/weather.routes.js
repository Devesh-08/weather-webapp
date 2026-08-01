import express from "express"
import { getForecast, getWeather, getWeatherByLocation } from "../controller/weatherController.js"
import { protect } from "../middlewares/authMiddleware.js"
import { optionalAuth } from "../middlewares/optionalAuth.js"

const router=express.Router()

router.get("/forecast/:city",protect,getForecast)

router.get("/currlocation",getWeatherByLocation)

router.get("/:city",optionalAuth,getWeather)

export default router
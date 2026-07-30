import express from "express"
import cors from "cors"
import weather from "./Routes/weather.routes.js"
import history from "./Routes/historyRoutes.js"
import favCity from './Routes/favCityRoutes.js'
import user from "./Routes/userRoute.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/weather",weather)
app.use("/api/history",history)
app.use("/api/favCity",favCity)
app.use("/api/users",user)

app.use(notFound)
app.use(errorHandler)

export default app
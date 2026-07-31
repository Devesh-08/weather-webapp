import express from "express"
import cors from "cors"
import weather from "./Routes/weather.routes.js"
import history from "./Routes/historyRoutes.js"
import favCity from './Routes/favCityRoutes.js'
import user from "./Routes/userRoute.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"

const app=express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://weather-webapp-henna.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/weather",weather)
app.use("/api/history",history)
app.use("/api/favCity",favCity)
app.use("/api/users",user)

app.use(notFound)
app.use(errorHandler)

export default app
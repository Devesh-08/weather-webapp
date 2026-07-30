import dotenv from "dotenv"
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/db/weatherdb.js";

connectDB()

const PORT=process.env.PORT|| 5000;

app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`);
})
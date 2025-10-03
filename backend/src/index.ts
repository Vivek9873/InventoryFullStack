import dotenv from "dotenv"
import express from "express";
import {connectToDB} from "./database/db.js";
import userRouter from "./route/user-routes.js";
import productRouter from "./route/product-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser"

dotenv.config();

connectToDB();

const app = express();
const PORT=process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    allowedHeaders:['Content-Type', 'Authorization'],
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH"]
}))
app.use(cookieParser());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);


app.listen(PORT,()=>{
    console.log(`Server is now running at http://localhost:${PORT}`);
})


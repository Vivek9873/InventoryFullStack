
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request,Response,NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECURITY_KEY= process.env.JWT_SECURITY_KEY || "12345123";
const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Access denied! No token provided. Please login to continue",
        })
    }
    try{
        const decodedToken = jwt.verify(token,JWT_SECURITY_KEY);
        const {userId} = decodedToken as JwtPayload;
        req.userId = userId;
        next();
    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message: "Access denied. No token provided. Please login to continue",
        })
    }
}

export default authMiddleware;
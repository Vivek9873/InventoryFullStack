import type { Request,Response,NextFunction } from "express";
import User from "../model/user.js";

const adminMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        if(user?.role!=="Seller"){
            return res.status(400).json({
                success:false,
                message:"Unauthorized User"
            })
        }
        next();
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Some error occured"+e
        })
    }
}

export default adminMiddleware;
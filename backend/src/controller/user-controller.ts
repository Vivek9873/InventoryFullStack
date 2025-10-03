
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type {Request,Response} from "express"
import { userValidator } from "../config/validation.js";
dotenv.config();

const JWT_SECURITY_KEY=process.env.JWT_SECURITY_KEY || "12345123";
// register
const registerUser= async(req:Request,res:Response)=>{
    try{
        // get username, email and password from frontend
        const {username,email,password,role} = req.body;
        
        if(!userValidator({email,password}) ){
            return res.status(400).json({
                success:false,
                message:"Either Invalid Email Format or Weak Password!"
            });
        }

        // Check if  email is present in our database or not
        const getUser = await User.findOne({ email });
        if(getUser){
            return res.status(400).json({
                success:false,
                message:"User is already exists!"
            })
        }

        // create hashPassword
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // adding it to database
        const newUser = await User.create({
            username,email,
            password:hashPassword,role
        })

        if(!newUser){
            res.status(400).json({
                success:false,
                message:"Unable to register the user! Please try again.",
    
            })
        }
        const token = jwt.sign({userId:newUser._id},JWT_SECURITY_KEY,{expiresIn:"30m"});
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            success:true,
            message:"New User Created Successfully",
            data:newUser
        })
    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}


// login

const loginUser = async(req:Request,res:Response)=>{
    try{
        // get username and password
        const {email,password} = req.body;

        if(!userValidator({email,password})){
            return res.status(400).json({
                success:false,
                message:"Either Invalid Email Format or Weak Password!"
            });
        }

        
        // check username exists or not
        
        const getUser = await User.findOne({email});
        if(!getUser){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist!",
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,getUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid Password",
            })
        }
        
        
        // create token
        const token = jwt.sign({userId:getUser._id},JWT_SECURITY_KEY,{expiresIn:"30m"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            success:true,
            message:"Login Successfully",
            data:getUser
        })

    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}

const logoutUser = (req:Request, res:Response) => {
    try {
        // clearing the cookie with name token
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout Successfull",
        })
    }
    catch (e) {
        res.status(500).json({
            message: `Logout Error is ${e}`
        })

    }
}


export {registerUser,loginUser,logoutUser};
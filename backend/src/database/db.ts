
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = async()=>{
    try{
        if(!MONGODB_URI){
            console.log("MongoDb URI is not present ")
            return ;
        }
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDb connected successfully")

    }
    catch(err){
        console.log("Connection Failed due to ",err);
    }
}

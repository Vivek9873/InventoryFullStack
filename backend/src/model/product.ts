

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
        trim:true,
    },
    image_url:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
export default Product;




import type { Request,Response } from "express";
import Product from "../model/product.js";
import { productValidator } from "../config/validation.js";

// add product 
export const addProductController=async(req:Request,res:Response)=>{
    try{
        const {name,description,type,image_url,quantity,price} = req.body;
        if(!productValidator(image_url) || typeof quantity!=="number" || typeof price!=="number"){
            return res.status(400).json({
                success:false,
                message:"Incorrect Input Format"
            })
        }
        const newProduct = await Product.create({name,description,type,image_url,quantity,price,sellerId:req.userId});
        res.status(200).json({
            success:true,
            message:"New Product is added in the inventory!",
            data:newProduct,
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

// update product 
export const updateProductController=async(req:Request,res:Response)=>{
    try{
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({
                success:false,
                message:"Product Id Required!"
            })
        }
        const {image_url,quantity,price} = req.body;
        if((image_url && !productValidator(image_url)) || (quantity &&  typeof quantity!=="number") || (price && typeof price!=="number")){
            return res.status(400).json({
                success:false,
                message:"Incorrect Input Format"
            })
        }
        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product doesn't exists!"
            })
        }
        if(product.sellerId?.toString() !== req.userId){
            return res.status(400).json({
                success:false,
                message:"Product is not listed by you!"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId,req.body,{new:true});
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}


// get all products 
export const getProductController=async(req:Request,res:Response)=>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 7;
        const skip = (page - 1) * limit;
        const sortBy = String(req.query.sortBy) || "price";
        const sortOrder = req.query.sortOrder==="asc"? 1 :-1;
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts/limit);
        const sort: Record<string, 1 | -1> = { [String(sortBy)]: sortOrder };

        
        const products = await Product.find().sort(sort).skip(skip).limit(limit);
        // const products = await Product.find({});

        if (products) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages,
                totalProducts,
                data: products,
            });
        }


    }
    catch(e){
        console.log("Error occured:",e);
        res.status(500).json({
            success:false,
            message:"Some error occured!",
        })
    }
}

// get product added by me
export const getProductBySeller = async(req:Request,res:Response)=>{
    try{
        const sellerId = req.userId;
        const products = await Product.find({sellerId})
        if(products.length===0){
            return res.status(400).json({
                success:false,
                message:"Products don't exists!"
            })
        }
        res.status(200).json({
            success:true,
            message:"Products found successfully",
            data:products
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

// delete product
export const deleteProduct = async(req:Request,res:Response)=>{
    try{
        const sellerId = req.userId;
        const productId = req.params.id;
        const product = await Product.findById(productId)
        if(product?.sellerId?.toString()!==sellerId){
            return res.status(400).json({
                success:false,
                message:"Product is not listed by you!"
            })
        }
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            success:true,
            message:"Product deleted successfully",
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







import express from "express";
import {addProductController,updateProductController,getProductController, getProductBySeller, deleteProduct} from "../controller/product-controller.js";
import authMiddleware from "../middleware/user-middleware.js";
import adminMiddleware from "../middleware/seller-middleware.js";

const router = express.Router();

router.post("/add",authMiddleware,adminMiddleware,addProductController);
router.put("/update/:id",authMiddleware,adminMiddleware,updateProductController);
router.get("/",authMiddleware,getProductController);
router.get("/myproducts",authMiddleware,adminMiddleware,getProductBySeller);
router.delete("/delete/:id",authMiddleware,adminMiddleware,deleteProduct);


export default router;

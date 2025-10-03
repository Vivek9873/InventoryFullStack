
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Buyer","Seller"],
        default:"Buyer"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
},{ timestamps: true });

 
const User = mongoose.model("User",userSchema);
export default User;
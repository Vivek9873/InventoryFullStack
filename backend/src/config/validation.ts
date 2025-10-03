import validator from "validator";
interface UserI{
    email:string,
    password:string
}

export const userValidator = (user:UserI):boolean=>{
    if(!validator.isEmail(user.email) || !validator.isStrongPassword(user.password)){
        return false;
    }
    return true;
}

export const productValidator = (image_url:string):boolean=>{
    if(!validator.isURL(image_url)){
        return false;
    }
    return true;
}
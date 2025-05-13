import mongoose from "mongoose"


const userSchema= new mongoose.Schema({
    //define propertiess that will be in the models
    name:{type:String,required:true},
    email: {type:String,required:true, unique:true},
    password: {type:String,required:true},
    cartData: {type:Object,default:{}}
},{minimize:false})   //if no false then cart data won't be created without any data


const userModel= mongoose.models.user || mongoose.model("user",userSchema); //if model created then use that if not create new model
export default userModel;
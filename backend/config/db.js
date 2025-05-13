import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://snehashrestha357:Sneha1234@cluster0.qhcnodd.mongodb.net/food-del').then(()=> console.log("DB connected"));
}


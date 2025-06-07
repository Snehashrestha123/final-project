import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoute.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express()
const port = 4000    


if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// middleware, here we initialize our middleware
app.use(express.json())   //using this middleware, whenever we get the request from frontend to backend, that will be passed using json


app.use(cors({
    origin: true,
    credentials: true
}));


mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

connectDB();

// API endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", orderRouter);
app.use("/api/reviews",reviewRouter);





app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://snehashrestha357:Sneha1234@cluster0.qhcnodd.mongodb.net/  
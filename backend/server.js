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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// app config
const app = express()
const port = 4000    //where our server will be running

// Create uploads directory if it doesn't exist
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


// // 1. Connect to MongoDB
// mongoose.connect('mongodb://localhost:4000/food-delivery', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // 2. Define Order Schema
// const orderSchema = new mongoose.Schema({
//   user: {
//     name: String,
//   },
//   items: [
//     {
//       name: String,
//       quantity: Number,
//     },
//   ],
//   status: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model('Order', orderSchema);

// // 3. GET all orders (for admin panel)
// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// // 4. (Optional) POST endpoint for placing orders (for your frontend)
// app.post('/api/orders', async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to place order' });
//   }
// });

// // 5. Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });



//run express server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://snehashrestha357:Sneha1234@cluster0.qhcnodd.mongodb.net/  
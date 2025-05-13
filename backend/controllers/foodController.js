import foodModel from "../models/foodModel.js";
import fs from 'fs'    //file system which is pre build in node.js


// add food item

const addFood = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`;
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.error("Error adding food:", error);
        res.json({ success: false, message: "Error adding food item" })
    }
}


//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        console.log("Found foods:", foods); // Debug log
        res.json({ success: true, data: foods })
    } catch (error) {
        console.error("Error fetching food list:", error);
        res.json({ success: false, message: "Error fetching food list" })
    }
}


//remove food items

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Delete image file
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.error("Error removing food:", error);
        res.json({ success: false, message: "Error removing food item" })
    }
}

export { addFood, listFood, removeFood }
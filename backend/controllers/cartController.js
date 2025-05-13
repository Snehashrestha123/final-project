import userModel from "../models/userModel.js"


//to store the items in the cart(database) even if the page is reloaded


//add to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); //we will get the userId from the middlware
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;          //if there is no entry in the cart with that item id, it will create a new entry.
        }
        else {
            cartData[req.body.itemId] += 1;         // if that card id is already present in the cart, then it will increase the value
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });         //update the user cart with the new data
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}



//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;      //extract the cart data
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });    //to update new cart data
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}



//fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


export { addToCart, removeFromCart, getCart }
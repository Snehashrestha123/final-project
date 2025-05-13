import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Login again" })

    }
    try {
        //if we have the token, we will decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();   //call back function
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}




export default authMiddleware;



// middleware converts the token into the user id and using that user id we can add or remove data from the cart
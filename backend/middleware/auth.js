// middleware converts the token into the user id and using that user id we can add or remove data from the cart

import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
    const user = await userModel.findById(decoded.id);
    
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    

    req.user = user;    
    next();
  } catch (err) {
    
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
export const requireAuth = async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        // Decode token to get the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized' });
      }
    }
  
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };

  
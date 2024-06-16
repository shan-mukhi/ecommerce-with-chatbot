// protecting routes using JWT token
import JWT from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
export const requireSignIn = async (req, res, next) => {
    try {
        //Extract token from request headers
        const token = req.headers.authorization;
        //Verify token presence
        if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });
        JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ error: "Unauthorized: Invalid token" });
            //Fetch user details from database based on decoded token (user ID)
            const user = await User.findById(decoded.userId);
            if (!user)  return res.status(404).json({ error: "User not found" });
             // Attach user object to request for further use in routes/controllers
            req.user = user;
            //Proceed to next middleware or route handler
            next();
        });

    } catch (error) {
        console.error("Error in requireSignIn middleware:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
//admin access
export const isAdmin = async (req, res, next) => {
    try{
     const user = await User.findById(req.user._id);
     if(user.role !== 1) throw new ApiError(401,"Unauthorized access");
     else next();
    }
    catch(error){
        console.log(error);
    }
}
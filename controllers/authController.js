import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import {User} from "../models/user.model.js";
import { hashPassword,comparePassword } from "../utils/authUtil.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer , role } = req.body;

        // Validations
        if (!name) throw new ApiError(400, "Name is required");
        if (!email) throw new ApiError(400, "Email is required");
        if (!phone) throw new ApiError(400, "Phone is required");
        if (!password) throw new ApiError(400, "Password is required");
        if (!address) throw new ApiError(400, "Address is required");
        if (!answer) throw new ApiError(400, "Answer is required");

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(201).json(
                new ApiResponse(201, existingUser, "User already registered. Please login.")
            );
        }

        // Create new user
        const hashedPassword = await hashPassword(password);
        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
            role
        });

        return res.status(200).json(
            new ApiResponse(200, createdUser, "User registered successfully.")
        );

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                message: error.message,
                errors: error.errors,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
        console.error("Error while Registering:", error);
        return res.status(500).json(new ApiError(500, "Error while registering user."));
    }
};


export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Validate email and password
        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        // Find user by email in database
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Compare passwords
        const passwordMatch = await comparePassword(password, user.password);

        // Check if password matches
        if (!passwordMatch) {
            throw new ApiError(401, "Invalid password");
        }

        // Generate JWT token for authentication
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response with JWT token
        return res.status(200).json(new ApiResponse(200, {
            token,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        }, "Login successfull"));

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                message: error.message,
                errors: error.errors,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
        console.error("Error while logging in:", error);
        next(new ApiError(500, "Error while logging in"));
    }
};


export const testController = async (req, res) => {

res.send({message : "access granted" })

};


export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, password } = req.body;

        // Check if required fields are present
        if (!email || !answer || !password) {
            throw new ApiError(400, "Email, answer and password are required");
        }

        // Find user in the database
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Example: Check if the answer matches a security question (for demonstration)
        if (answer !== user.answer) {
            throw new ApiError(400, "Incorrect answer to security question");
        }

        // Generate a hash of the new password
        const hashedPassword = await hashPassword(password);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password reset successfull" });

    } catch (error) {
        console.error("Forgot password error:", error);
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};














import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; // Make sure to specify the correct path and extension
import {User} from "../models/user.model.js";
import { hashPassword,comparePassword } from "../utils/authUtil.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,role} = req.body; 

        // Validations
        if (!name) return res.send({ error: "Name is required" });
        if (!email) return res.send({ error: "Email is required" });
        if (!phone) return res.send({ error: "Phone is required" });
        if (!password) return res.send({ error: "Password is required" });
        if (!address) return res.send({ error: "Address is required" });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(201).json(
                new ApiResponse(200, existingUser, "User already registered. Please login.")
            );
        }

        // Create new user
        const hashedPassword = await hashPassword(password);
        const createdUser = await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            address,
            role
        });

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully.")
        );

    } catch (error) {
        console.error("Error while Registering:", error);
        throw new ApiError(500, "Error while registering user.");
    }
};


export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
      // Find user by email in database
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
       // Compare passwords
        const passwordMatch = await comparePassword(password, user.password);

        // Check if password matches
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
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
        }, "Login successful"));

    } catch (error) {
        console.error("Error while logging in:", error);
        throw new ApiError(500, "Error while logging in.");
    }
};


export const testController = async (req, res) => {

res.send({message : "access granted" })

};
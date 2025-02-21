import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

export const signup = async (req, res) => {
    const { email, password, firstname, lastName } = req.body;
    try {
        if (!email || !password || !firstname || !lastName) {
            throw new Error("All fields are required");
        }


        const userAlreadyExists = await User.findOne({ email });
        console.log("userAlreadyExists", userAlreadyExists);

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }


        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            firstname,
            lastName,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        await user.save();

        generateTokenAndSetCookie(res, user._id); //jwt token
        sendVerificationEmail(user.email, verificationToken);
        

        user.password = undefined;


      res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });


    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    res.send("Login Route");
};

export const logout = async (req, res) => {
    res.send("Logout Route");
};


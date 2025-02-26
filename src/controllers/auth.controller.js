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
    const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
export const changePassword = handelErrors(async (req, res) => {
    let user = await user.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.oldPassword, user.password))) {
        let user = await user.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword }, { new: true });

        let token = JsonWebTokenError.sign({userId: user._id, role: user.role}, "secretkey")
        res.json({message: "Password successfully changed", user, token})
    }
    next(new Error("Invalid email or password"));
});

export const logout = async (req, res) => {
    res.send("Logout Route");
};


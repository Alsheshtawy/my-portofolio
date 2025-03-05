import { User } from "../../database/models/user.model.js";


export const checkEmails = async (req, res, next) => {
    letisFound = await User.findOne({ email: req.body.email });
    if (isFound) {
        return next(new Error("Email already exists"))
        }
        next();
    }
    

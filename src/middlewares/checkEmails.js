import { User } from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import  HttpStatusText from "../utils/HttpStatusText.js";



export const checkEmails = async (req, _res, next) => {
    let isFound = await User.findOne({ email: req.body.email });
    if (isFound) {
       const error = AppError.create("Email already exists", 400 , HttpStatusText.FAIL);
       return next(error);
        }
        next();
    }
    

import Jwt from "jsonwebtoken";
import  AppError  from "../utils/AppError.js";
import  HttpStatusText  from "../utils/HttpStatusText.js";

export const verifyToken = (req, res, next) => {

    let [key, token] = req.headers.token.split(" ");

    console.log("token", token, "key", key);
    if (!token) {
        const error = AppError.create("Token is required", 400, HttpStatusText.FAIL);
        return next(error);
    }

    Jwt.verify(token, "secretkey", (err, decoded) => {

        if (err) return res.json({ message: "Invalid token" })

        next()
    })

}
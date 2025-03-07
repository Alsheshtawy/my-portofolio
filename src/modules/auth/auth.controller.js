import { User } from "../../models/user.model.js";
import { handelError } from "../../middlewares/catchError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = handelError(async (req, res, next) => {
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, "secretkey")
    res.json({ message: "User registered successfully", user, token })
})



export const login = handelError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, "secretkey")
        res.json({ message: "login successfully", user, token })
    }
    res.json({ message: "Invalid email or password" })
})



export const changePassword = handelError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.oldpassword, user.password)) {

        let user = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword }, { new: true })


        let token = jwt.sign({ userId: user._id, role: user.role }, "secretkey")
        res.json({ message: " change password successfully", user, token })
    }
    next(new Error("Invalid email or password"))

})


import { User } from "../../models/user.model.js";
import { handleError } from "../../middlewares/catchError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = handleError(async (req, res, next) => {
    let user = new User(req.body);
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, "secretkey")
    res.json({ message: "User registered successfully", user, token })
})



export const login = handleError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, "secretkey")
        res.json({ message: "login successfully", user, token })
    }
    res.json({ message: "Invalid email or password" })
})



export const changePassword = handleError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.oldpassword, user.password)) {

        let user = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword, passwordChangedAt: Date.now() }, { new: true })
        
        let token = jwt.sign({ userId: user._id, role: user.role }, "secretkey")
        
        res.json({ message: " change password successfully", user, token })
    }
    next(new Error("Invalid email or password"))

})
export const protectedRouter = handleError(async (req, res, next) => {

    let { token } = req.headers
    let userPayload = null
    if (!token) return next(new Error("token is reqiured"))

    jwt.verify(token, "secretkey", (err, Payload) => {
        if (err) return next(newError("invalid token", 401))
        userPayload = Payload
        console.log(userPayload.iat, "token time")
    })
    let user = await User.findById(userPayload.userId)
    if (!user) return next(new Error("User not found", 404))
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        console.log(time, "password")
    }
    if (time > user.Payload.iat)
        next(new Error("invalid token please try login again", 401))
    req.user = user


});
import { Router } from "express";
import { checkEmails } from "../../middlewares/checkEmails.js";
import { verifytoken } from "../../middlewares/verifytoken.js";
import { validate } from '../../middlewares/validate.js';
import { signUp, login, getAllUsers ,updateUser ,deleteUser ,addUser} from "./user.controller.js";
import jwt from 'jsonwebtoken';
import { signupValidation } from "./user.validation.js";
import { User } from "../../models/user.model.js";

const userRouter = Router();



userRouter.post("/add",checkEmails, addUser)
userRouter.post("/signup",validate(signupValidation),checkEmails,signUp)
userRouter.post("/login",login)

userRouter.get("/verify/:token",async(req,res)=>{
    const { token } = req.params;
    jwt.verify(token,"secretkey", async (err, decode)=>{
        if(err) return res.json({message:"Invalid token for verify"})
            let isFoundedEmail = await User.findOneAndUpdate({email:decode.email},{confirmedEmail:true},{new:true})
        res.json({message:"email verified successfully"})

    })
})
        

userRouter.get("/get",verifytoken,getAllUsers)


userRouter.put("/update/:id",verifytoken,updateUser)


userRouter.delete("/delete/:id",verifytoken,deleteUser)

export default userRouter;
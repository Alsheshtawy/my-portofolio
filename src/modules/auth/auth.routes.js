import { Router } from "express";
import {checkEmails} from "../../middlewares/checkEmails.js";
import {register, login, changepassword} from "./auth.controller.js";

const authRouter = Router()


authRouter.post("/register",checkEmails,register)
authRouter.post("/login",login)
authRouter.post("/changepassword",changepassword)









export default authRouter;
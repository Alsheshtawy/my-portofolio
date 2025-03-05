import { Router } from 'express';
import { addUser } from "./user.controller.js";
const userRouter = Router();



userRouter.post("/add",checkEmails,addUser)


userRouter.get("/get",getAllUsers)


userRouter.put("/update/:id",updateUser)


userRouter.delete("/delete/:id",deleteUser)

export default userRouter;
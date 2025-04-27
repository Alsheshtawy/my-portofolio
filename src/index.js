import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { globalErrorHandling } from "./middlewares/globalErrorHandling.js";
import  userRouter  from "./modules/user/user.routes.js";
import  authRouter  from "./modules/auth/auth.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.send("API is running"))

app.use("*", (req, res, next) => {
    const err = new Error("Route not found");
    err.statusCode = 404;
    next(err);
})
app.use(globalErrorHandling)

app.listen(PORT, () => {
    dbConnection();
    console.log(" Server is running on port: ", PORT);
});

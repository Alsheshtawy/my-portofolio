import express from 'express';
import { dbConnection } from "./database/dbConnection.js";
import { globalErrorHandling } from "./middlewares/globalErrorHandling.js";
import { userRouter } from "./models/user/user.routes.js";
const app = express();
const PORT = 5000;

app.use(express.json());


app.get("/", (req, res) => res.send("API is running"))
app.use("/user", userRouter);
app.use("*", (req, res, next) => {
    const err = new Error("Route not found");
    err.statusCode = 404;
    next(err);
})



dbConnection


app.use(globalErrorHandling);

app.listen(PORT, () => {
    dbConnection();
    console.log(" Server is running on port: ", PORT);
});

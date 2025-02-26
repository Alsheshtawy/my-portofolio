import express from 'express';
import { connectDB } from "./db/connectDB.js";
import  authRoutes  from "./routes/auth.route.js";
import { globalErrorHandling } from "./middleware/errorHandling.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get("/", (req, res) => res.send("API is running"))
app.use("*",(req,res,next)=>{
    const err = new Error("Route not found");
    err.statusCode = 404;
    next(err);
})





app.use("/api/auth", authRoutes);
app.use(globalErrorHandling);


app.listen(PORT, () => {
    connectDB();
    console.log(" Server is running on port: ", PORT);
});

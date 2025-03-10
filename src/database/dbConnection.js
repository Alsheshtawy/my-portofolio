import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/MyGOLD").then(() => {
    console.log("Database connected successfully")
}).catch(() => {
    console.log("Error connecting to the database");
})

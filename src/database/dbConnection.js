import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb://localhost:27017/mygold").then(() => {
    console.log("Database connected successfully")
}).catch(() => {
    console.log("Error connecting to the database");
})

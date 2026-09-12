import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDB connected Successfully")
    } catch (error) {
        console.log("Error in mongoDB connection:", error);
    }
}

export default connectDB;
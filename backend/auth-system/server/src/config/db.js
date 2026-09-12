import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
       await mongoose.connect(config.MONGO_URI);
       console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.log("Error in MongoDB Connection", error);
    }
}

export default connectDB;
import config from "./config.js";
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDb Connected Successfully!")
    } catch (error) {
        console.log("Mongon connect error: ", error)
    }
}

export default connectDB;
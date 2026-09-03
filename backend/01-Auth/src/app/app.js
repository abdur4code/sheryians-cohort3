import dotenv from "dotenv";
dotenv.config()
import express from "express";
import connectDB from "../config/db.js";
import { loginUserController, registerUserController } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";


await connectDB();

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({message: "Hello I am server!"})
})

app.post('/api/auth/register', registerUserController)

app.get('/api/auth/me', authenticateUser, (req, res) => {
    res.status(200).json({
        message: "User Authenticated!",
        data: {
            user: req.user
        }
    })
})

app.post('/api/auth/login', loginUserController)

export default app;
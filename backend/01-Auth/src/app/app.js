import dotenv from "dotenv";
dotenv.config()
import express from "express";
import jwt from "jsonwebtoken";
import connectDB from "../config/db.js";
import { registerUserController } from "../controllers/user.controller.js";
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";


await connectDB();

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({message: "Hello I am server!"})
})

app.post('/api/auth/register', registerUserController)

app.get('/api/auth/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    const decodeData = jwt.decode(authHeader);

    const user = await UserModel.findById(decodeData.id);
    
    
})

export default app;
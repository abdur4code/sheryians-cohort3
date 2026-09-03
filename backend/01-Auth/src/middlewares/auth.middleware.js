import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message: "Token Not Found!"
        })
    }

    const userData =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findById(userData.id)

    //(Hum yaha per request k andar ek "user" naam ki property create kar rahe hai aur isme user set kar rahe hai)
    req.user = user;

    next()
}
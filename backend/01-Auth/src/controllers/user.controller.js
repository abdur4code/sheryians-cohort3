import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUserController = async (req, res) => {
    const {name, email, password} = req.body;

    let user = await UserModel.create({name, email, password}); 

    const token = jwt.sign(
        {
        id: user._id
        },
        process.env.JWT_SECRET_KEY
    )

    res.status(201).json({
        message: "User Registered Successfully!",
        data: {
            user:{
                name, email,
                id: user._id,
            },
            token
        }
    })
}

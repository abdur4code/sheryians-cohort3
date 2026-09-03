import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const registerUserController = async (req, res) => {
    const {name, email, password} = req.body;

    let user = await UserModel.create({name, email, password: await bcrypt.hash(password, 10)}); 

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

export const loginUserController =  async (req, res)=> {
    const {email, password} = req.body;

    const user = await UserModel.findOne({
        email
    })

    const isValidPassword = bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(400).json({
            message: "Wrong email or password!"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY)

    res.status(200).json({
        message: "User login Successdully!",
        data:{
            user
        },
        token
    })
}

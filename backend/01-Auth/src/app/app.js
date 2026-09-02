import express from "express";
import jwt from "jsonwebtoken";
import connectDB from "../config/db.js";

await connectDB();

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.status(200).json({message: "Hello I am server!"})
})

app.post('/api/auth/register', (req, res) => {
    const {name, email, password} = req.body;

    //save data to DB

    const token = jwt.sign({
        email,name},
    )
    
})

export default app;
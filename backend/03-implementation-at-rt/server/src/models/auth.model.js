import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        minLength: 3,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    passwordHash:{
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken:{
        type: String,
    }
})

const AuthModel = mongoose.model('AuthModel', authSchema);

export default AuthModel;
import UserModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js";


/**
 * @POST /api/auth/register
 */
export const authRegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name && !email && !password) {
            return res.status(400).json({
                message: "Entered invalid or blank input"
            })
        }

        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
            return res.status(409).json({
                message: "Email already registered!"
            })
        }

        const user = await UserModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 12)
        })

        if (!user) {
            console.log("Error in DataBase while creating/saving user creadential");
            return res.status(500).json({
                message: "Error in DataBase while creating/saving user creadential"
            })
        }

        const { accessToken, refreshToken } = generateTokens({ userId: user._id });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        res.status(201).json({
            message: "User registered successfully!",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                },
                accessToken
            }
        })

    } catch (error) {
        console.log("Error in register Api: ", error);
        return (res.status(500).json({
            message: "Enternal server error"
        }))
    }
}

/**
 * @GET /api/auth/me
 */
export const authMeController = async (req, res) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1]

        if (!accessToken) {
            console.log('Access token not found');
            return res.status(401).json({
                message: "Unauthorozed! Access token not found"
            })
        }

        const decodedAccessToken = await verifyAccessToken(accessToken);
        const user = await UserModel.findById(decodedAccessToken.id);

        res.status(200).json({
            message: "user fetched successfully!",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                }
            }
        })

    } catch (error) {
        console.log('Invalid or expired Access Token:', error);
        return res.status(401).json({
            message: "Invalid or expired Access Token"
        })
    }
}

/**
 * @POST /api/auth/refresh
 */
export const authRefreshController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        console.log("Refresh token not found");
        return res.status(401).json({
            message: "Unauthorized! Refresh Token Not Found"
        })
    }
    try {
        const decodedRefreshToken = await verifyRefreshToken(refreshToken);

        const user = await UserModel.findById(decodedRefreshToken.id);

        if (user.refreshToken !== refreshToken) {
            user.refreshToken = null;
            await user.save();

            console.log("Refresh token mismatch");
            return res.status(401).json({
                message: "Unauthorized! Refresh token mismatch"
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: user._id });

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
        user.refreshToken = newRefreshToken;
        await user.save();


        res.status(200).json({
            message: "Tokens Refreshed Successfully",
            accessToken
        })
    } catch (error) {
        console.log("Unauthorized! Invalid or expired refresh token", error)
        return res.status(401).json({
            message: "Unauthorized! Invalid or expired refresh token"
        })
    }
}

/**
 * @POST /api/auth/login
 */
export const authLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(401).json({
                message: "Entered invalid email and password"
            })
        }

        const user = await UserModel.findOne({ email });
        const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordMatched){
            console.log("Password does not match!");
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const {accessToken, refreshToken} = generateTokens({userId: user._id});

        res.cookie("refreshToken", refreshToken, {httpOnly: true});
        user.refreshToken = refreshToken;
        await user.save();
        
        res.status(200).json({
            message: "User login successfully",
            accessToken
        })


    } catch (error) {
        console.log("Invalid email or password: ", error);
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }
}
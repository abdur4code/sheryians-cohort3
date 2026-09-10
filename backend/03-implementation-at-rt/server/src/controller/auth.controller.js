import AuthModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateTokens, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js";


/**
 * @POST /api/auth/register
 */
export const authRegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await AuthModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                message: "Bad Request try with another email",
                errors: [
                    {
                        path: "email",
                        message: "Try with another email"
                    }
                ]
            })
        }

        const user = await AuthModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 12)
        })

        const { accessToken, refreshToken } = generateTokens({userId: user._id})

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        });

        res.status(201).json({
            message: "User registred Successfully!",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                }
            },
            accessToken
        })
        
    } catch (error) {
        console.log("Post Register API function error:", error);
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

/**
 * @GET /api/auth/me
 */
export const authMeController = async (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1]

    try {
        const decoded = verifyAccessToken(accessToken);

        const user = await AuthModel.findById(decoded.id);

        res.status(200).json({
            message: "User fetched successfully!",
            data: {
                user:{
                    name: user.name,
                    email: user.email,
                }
            }
        })
    } catch (error) {
        console.log("Invalid or expired Access Token:", error)
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

    if(!refreshToken){
        console.log("Refresh Token not Found");
        return res.status(401).json({
            message: "Unauthorized! Refresh token not found."
        })
    }

    try {
        const decoded = await verifyRefreshToken(refreshToken);

        const user = await AuthModel.findById(decoded.id);

        if(user.refreshToken !== refreshToken){
            user.refreshToken = null;
            await user.save();

            console.log("Unauthorized! Refresh token mismatch");
            return res.status(401).json({
                message: "Unauthorized! Refresh token mismatch"
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens({userId: user._id})


        res.cookie("refreshToken", newRefreshToken, {httpOnly: true});
        user.refreshToken = newRefreshToken;
        await user.save();

        return res.status(200).json({
            message: "Tokens refreshed successfully!",
            accessToken
        })
    } catch (error) {
        console.log("Unauthorized! Invalid or expired refresh token", error)
        return res.status(401).json({
            message: "Unauthorized! Invalid or expired refresh token"
        })
    }
}

export default {
    authRegisterController,
    authMeController,
    authRefreshController,
};
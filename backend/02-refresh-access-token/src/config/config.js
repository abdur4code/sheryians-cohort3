import dotenv from 'dotenv';
dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI,
    REFRESH_JWT_SECRET : process.env.REFRESH_JWT_SECRET,
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
    PORT: process.env.PORT
}

export default config;
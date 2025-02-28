import dotenv from 'dotenv'
dotenv.config()

export const {
PORT,
MONGODB_URI,
JWT_SECRET,JWT_SECRET_EXPIER,
NODE_ENV,
} = process.env



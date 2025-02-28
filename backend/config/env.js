import dotenv from 'dotenv'
dotenv.config()

export const {
PORT,
MONGODB_URI,
JWT_SECRET,JWT_SECRET_EXPIER,
NODE_ENV,
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY,
} = process.env



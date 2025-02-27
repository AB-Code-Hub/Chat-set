import express from "express"
import authRoutes from './routes/auth.routes.js'
import { PORT } from "../config/env.js";
import { connectDB } from "./lib/db.js";
const app = express();

app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
    connectDB()
})
import express from "express"
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import { PORT } from "../config/env.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser"
const app = express();

app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
    connectDB()
})
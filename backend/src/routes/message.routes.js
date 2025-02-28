import express from "express"
import { protecteRoute } from "../middlewares/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/users", protecteRoute, getUsersForSidebar )


export default router;
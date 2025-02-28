import express, { Router } from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protecteRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protecteRoute,  updateProfile)

export default router;

import express, { Router } from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protecteRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", protecteRoute,  logout);

router.put("/update-profile", protecteRoute, updateProfile);

router.get("/check", protecteRoute, checkAuth);

export default router;

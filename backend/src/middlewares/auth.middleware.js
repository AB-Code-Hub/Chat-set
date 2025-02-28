import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../../config/env.js";

export const protecteRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Inavlid token" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("error in protecte Route", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

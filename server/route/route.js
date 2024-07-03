// src/routes/authRoutes.js
import express from "express";
const router = express.Router();
import { signup, login } from "../controller/authcontroller.js";
import { updateUserProfile } from "../controller/profilecontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.put("/profile", authMiddleware, updateUserProfile);

export default router;

// src/routes/authRoutes.js
import express from "express";
const router = express.Router();
import { signup, login } from "../controller/authcontroller.js";
import { updateUserProfile } from "../controller/profilecontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { createPost } from "../controller/postcontroller.js";
import { createComment, toggleLike } from "../controller/postcontroller.js";

router.post("/signup", signup);
router.post("/login", login);
router.put("/profile", authMiddleware, updateUserProfile);
router.post("/", authMiddleware, createPost);
router.post("/:postId/comments", authMiddleware, createComment);
router.post("/:postId/like", authMiddleware, toggleLike);


export default router;

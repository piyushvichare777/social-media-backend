import express from "express";
const router = express.Router();
import { signup, login } from "../controller/authcontroller.js";
import { updateUserProfile } from "../controller/profilecontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import {
  createPost,
  createComment,
  toggleLike,
} from "../controller/postcontroller.js";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controller/followercontroller.js";
import {
  getNotifications,
  markNotificationsAsRead,
} from "../controller/notificationcontoller.js";

import {
  sendMessage,
  getMessages,
  markMessagesAsRead,
} from "../controller/directmessagecontroller.js";


router.post("/signup", signup);
router.post("/login", login);

router.put("/profile", authMiddleware, updateUserProfile);
router.post("/createpost", authMiddleware, createPost);
router.post("/:postId/comments", authMiddleware, createComment);
router.post("/:postId/like", authMiddleware, toggleLike);

router.post("/follow/:followId", authMiddleware, followUser);
router.post("/unfollow/:unfollowId", authMiddleware, unfollowUser);
router.get("/followers", authMiddleware, getFollowers);
router.get("/following", authMiddleware, getFollowing);

router.get("/notifications", authMiddleware, getNotifications);
router.put('/read', authMiddleware, markNotificationsAsRead);

router.post("/send/:receiverId", authMiddleware, sendMessage);
router.get("/messages/:userId", authMiddleware, getMessages);
router.put("/read/:userId", authMiddleware, markMessagesAsRead);

export default router;

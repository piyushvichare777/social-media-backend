
import express from "express";
import connectDB from "./DB/const.js";
import dotenv from "dotenv";
import authRoutes from "./route/route.js";
import userRoutes from "./route/route.js"
import postRoutes from "./route/route.js"
import commentRoutes from "./route/route.js"
import likeRoutes from "./route/route.js"
import route from "./route/route.js";
import notification from "./route/route.js";
import directmessage from "./route/route.js";

import errorHandler from "./utils/errorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
connectDB(MONGODB_URI);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api", route);
app.use("/api/notification", notification);
app.use("/api/directmessage", directmessage);



// Error handler middleware
app.use(errorHandler);

app.listen(PORT, console.log(`server started on port ${PORT}`));


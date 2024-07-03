// index.js
import express from "express";
import connectDB from "./DB/const.js";
import dotenv from "dotenv";
import authRoutes from "./route/route.js";
import userRoutes from "./route/userRoutes.js";

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
app.use("/api/user", userRoutes)
    


// Error handler middleware
app.use(errorHandler);

app.listen(PORT, console.log(`server started on port ${PORT}`));


// src/index.js
import express from "express";
import cors from "cors";

// Import routes
import postsRoutes from "./routes/posts/posts.js";
import postsRateRoutes from "./routes/posts/postsRate.js";
import usersRoutes from "./routes/user/users.js";
import blogsRoutes from "./routes/blogs/blogs.js";
import userPostsRoutes from "./routes/user/posts/userPosts.js";
import getUserPostsRoutes from "./routes/user/posts/getUserPosts.js";
import loginRoutes from "./routes/auth/login.js";
import getPostsRoute from "./routes/posts/getPosts.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---- ROUTES ----

app.use("/api/auth/login", loginRoutes);

// Posts
app.use("/api/posts", postsRoutes);            // General posts (CRUD)
app.use("/api/posts/rate", postsRateRoutes);   // Post ratings
app.use("/api/getPosts", getPostsRoute);    //Fetch endpoint for individual post
// Users
app.use("/api/users", usersRoutes);            // User management

// Blogs
app.use("/api/blogs", blogsRoutes);            // Blogs

// Current user posts
app.use("/api/user/posts", userPostsRoutes);      // e.g., GET /me, POST /
app.use("/api/user/posts/fetch", getUserPostsRoutes); // Other fetching endpoints

// Catch-all for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

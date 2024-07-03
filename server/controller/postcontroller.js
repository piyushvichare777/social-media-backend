// src/controllers/postController.js
import Post from "../models/postmodel.js";

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    // Create new post
    const post = new Post({ user: userId, content });
    await post.save();

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    // Create new comment
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ user: userId, content });
    await post.save();

    res.status(201).json({ message: "Comment created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already liked the post
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // User already liked the post, unlike it
      post.likes.pull(userId);
      await post.save();
      res.json({ message: "Post unliked successfully", liked: false });
    } else {
      // User hasn't liked the post, like it
      post.likes.push(userId);
      await post.save();
      res.json({ message: "Post liked successfully", liked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export { createPost , createComment, toggleLike};

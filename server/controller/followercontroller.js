
import User from "../models/usermodel.js";



// Follow user
const followUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { followId } = req.params;

    if (userId === followId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const user = await User.findById(userId);
    const followUser = await User.findById(followId);

    if (!followUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.following.includes(followId)) {
      user.following.push(followId);
      followUser.followers.push(userId);

      await user.save();
      await followUser.save();
    }

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Unfollow user
const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { unfollowId } = req.params;

    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);

    if (!unfollowUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.following.includes(unfollowId)) {
      user.following.pull(unfollowId);
      unfollowUser.followers.pull(userId);

      await user.save();
      await unfollowUser.save();
    }

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get followers
const getFollowers = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("followers", "username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ followers: user.followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get following
const getFollowing = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("following", "username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ following: user.following });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { followUser, unfollowUser, getFollowers, getFollowing };

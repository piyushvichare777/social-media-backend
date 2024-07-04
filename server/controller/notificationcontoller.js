import Notification from "../models/notificationmodel.js";

// Create a new notification
const createNotification = async (userId, type, message) => {
  try {
    const notification = new Notification({ user: userId, type, message });
    await notification.save();
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// Get notifications for a user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark notifications as read
const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, read: false },
      { read: true }
    );
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createNotification, getNotifications, markNotificationsAsRead };

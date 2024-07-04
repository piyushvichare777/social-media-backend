import Message from "../models/directmessagemodel.js";

// Send a message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    await message.save();

    res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch messages between two users
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user.id;

    // Fetch messages where the current user is the sender or receiver
    const messages = await Message.find({
      $or: [
        { sender: currentUser, receiver: userId },
        { sender: userId, receiver: currentUser },
      ],
    }).sort({ createdAt: "asc" });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user.id;

    // Update all unread messages from userId to currentUser as read
    await Message.updateMany(
      { sender: userId, receiver: currentUser, read: false },
      { read: true }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { sendMessage, getMessages, markMessagesAsRead };

const Message = require("../models/Message");

// Get messages where the user is either sender or receiver
exports.getMessagesForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
};

// Send message
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, senderType, message } = req.body;
        const newMessage = new Message({ senderId, receiverId, senderType, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Error sending message" });
    }
};

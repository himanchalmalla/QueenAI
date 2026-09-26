import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = (req, res) => {
    try {
        const userId = req.header['x-user-id'];
        console.log(userId);
        const conversation = new Conversation.create({
            userId: userId
        });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ error: `Failed to start conversation ${error.message}` });
    }
}

export const updateConversation = async (req, res) => {
    try {
        const { conversationId, title } = req.body;
        const conversation = await Conversation.findOneAndUpdate({ _id: conversationId }, { title: title }, { new: true });
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json({ error: `Failed to update conversation ${error.message}` });
    }
}

export const getConversation = (req, res) => {
    try {
        const userId = req.header['x-user-id'];
        const conversations = Conversation.find({ userId: userId }).sort({ updatedAt: -1 });
        return res.status(200).json(conversations);
    } catch (error) {
        return res.status(500).json({ error: `Failed to fetch conversations ${error.message}` });
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body;
        const message = await Message.create({
            conversationId: conversationId,
            role: role,
            content: content
        });
        return res.status(200).json(message);

    } catch (error) {
        return res.status(500).json({ error: `Failed to send message ${error.message}` });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId: conversationId }).sort({ createdAt: 1 });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ error: `Failed to fetch messages ${error.message}` });
    }
}
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const conversation = await Conversation.create({
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

export const getConversation = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const conversations = await Conversation.find({ userId: userId }).sort({ updatedAt: -1 });
        return res.status(200).json(conversations);
    } catch (error) {
        return res.status(500).json({ error: `Failed to fetch conversations ${error.message}` });
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content, images } = req.body;
        const message = await Message.create({
            conversationId: conversationId,
            role: role,
            content: content,
            images: images
        });
        return res.status(200).json(message);

    } catch (error) {
        return res.status(500).json({ error: `Failed to send message ${error.message}` });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        console.log(conversationId)
        const messages = await Message.find({ conversationId: conversationId });
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ error: `Failed to fetch messages ${error.message}` });
    }
}
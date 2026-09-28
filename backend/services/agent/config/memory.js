import { getMessages } from "../utils/messages.js";
import redis from "../../../shared/redis/redis.js";

export const getMemory = async (conversationId) => {
    const messageKey = `messages-${conversationId}`;
    const redisMessage = await redis.get(messageKey);
    if (redisMessage) {
        return JSON.parse(redisMessage);
    }

    const response = await getMessages(conversationId);
    const messages = response.data;
    await redis.set(messageKey, JSON.stringify(messages), "EX", 1 * 24 * 60 * 60);
    return messages;

}

export const addMessage = async (conversationId, role, content) => {
    const messageKey = `messages-${conversationId}`;
    const messages = await redis.get(messageKey);
    const parsedMessages = messages ? JSON.parse(messages) : [];
    parsedMessages.push({ role, content });
    if (parsedMessages.length > 20) parsedMessages.shift();
    await redis.set(messageKey, JSON.stringify(parsedMessages), "EX", 1 * 24 * 60 * 60);
}
import { api } from "../utils/axios.js";

export const createConversation = async () => {
    const { data } = await api.post("/chat/create-conversation");
    return data;
}

export const updateConversation = async (payload) => {
    const { data } = await api.put("/chat/update-conversation", payload);
    return data;
}

export const getConversation = async () => {
    const { data } = await api.get("/chat/get-conversation");
    return data;
}

export const getMessages = async (conversationId) => {
    const { data } = await api.get(`/chat/get-messages/${conversationId}`);
    return data;
}
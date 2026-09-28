import { api } from "../utils/axios.js";

export const createMessage = async (data) => {
    try {
        const res = await api.post("/agent/chat", data);
        return res.data;
    } catch (error) {
        return error;
    }
}
import { api } from "../utils/axios.js";

export const getCurrentUser = async () => {
    const { data } = await api.get("/me");
    return data;
}
import { api } from "../utils/axios";


export const logout = async () => {
    try {
        await api.get("/auth/logout");
        return true;
    } catch (error) {
        return error;
    }
}
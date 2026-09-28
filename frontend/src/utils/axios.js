import axios from "axios";
import { setUserData } from "../redux/slice/user.slice";

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        setUserData(null);
    } else {
        return Promise.reject(error);
    }
});
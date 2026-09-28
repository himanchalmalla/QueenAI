import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.slice.js";
import conversationReducer from "./slice/conversation.slice.js";
import messageReducer from "./slice/message.slice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationReducer,
        message: messageReducer
    },
});
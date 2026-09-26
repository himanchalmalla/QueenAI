import express from "express";
import { createConversation, getConversation, getMessages, saveMessage, updateConversation } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/create-conversation", createConversation);
router.put("/update-conversation", updateConversation);
router.get("/get-conversation", getConversation);
router.post("/create-message", saveMessage);
router.get("/get-messages/:conversationId", getMessages);

export default router;
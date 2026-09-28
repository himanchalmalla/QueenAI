import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import dotenv from "dotenv";

dotenv.config();

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
    maxRetries: 2,
})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
    temperature: 0.7,
    maxRetries: 2,
})

export const getModel = (agent) => {
    switch (agent) {
        case "chat": return groq;
        case "search": return groq;
        case "coding": return groq;
        case "pdf": return groq;
        case "ppt": return groq;
        case "vision": return gemini;
        default: return groq;
    }
}
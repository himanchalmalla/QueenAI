import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/chat.route.js";

dotenv.config();

const port = process.env.CHAT_PORT || 3001;
const app = express();

app.use(express.json());
app.use("/", router);
app.listen(port, () => {
    console.log(`Chat started on port ${port}`);
    connectDB();
});

app.get("/", (req, res) => {
    res.status(200).send("Chat is running");
});
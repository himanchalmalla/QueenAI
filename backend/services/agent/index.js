import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.AGENT_PORT || 3001;
const app = express();

app.use(express.json());

app.listen(port, () => {
    console.log(`Agent started on port ${port}`);
    connectDB();
});

app.get("/", (req, res) => {
    res.status(200).send("Agent is running");
});
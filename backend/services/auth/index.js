import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config();

const port = process.env.AUTH_PORT || 3001;
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
    console.log(`Auth started on port ${port}`);
    connectDB();
});

app.get("/", (req, res) => {
    res.status(200).send("Auth is running");
});
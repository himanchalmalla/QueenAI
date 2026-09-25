import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js";
dotenv.config();

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Gateway started on port ${port}`);
});

app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api", router);
import express from "express";
import { getCurrentUser, testAPI } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.get("/", testAPI);
export default router;
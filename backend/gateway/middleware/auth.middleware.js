import redis from "../../shared/redis/redis.js";
export const authMiddleware = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session;
        const sessionData = await redis.get(`session-${sessionId}`);
        if (!sessionData) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = JSON.parse(sessionData);
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
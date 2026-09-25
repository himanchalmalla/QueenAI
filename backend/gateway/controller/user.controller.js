export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const testAPI = async (req, res) => {
    try {
        await res.status(200).send("Welcome to QueenAI");
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }

};
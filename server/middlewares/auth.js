// middlewares/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "My-Secret-code";

const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token and attach the decoded payload to req.user
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;

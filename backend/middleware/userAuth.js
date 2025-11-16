import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!req.body) req.body = {};
        req.body.userId = decoded.id;

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid/Expired token" });
    }
};

export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!req.body) 
            req.body = {};
        req.body.userId = decodedToken.id;

        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;

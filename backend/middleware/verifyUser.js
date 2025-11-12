import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized." });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ success: false, message: "Invalid Token." });
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

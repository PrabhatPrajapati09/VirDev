import User from "../models/User.js";

export const getUserData = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            userData: {
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
                isUserVerified: user.isUserVerified
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
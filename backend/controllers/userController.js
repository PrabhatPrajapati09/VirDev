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
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                isUserVerified: user.isUserVerified,
                username: user.username,
                age: user.age,
                gender: user.gender,
                profilePic: user.profilePic,
                skills: user.skills,
                about: user.about,

            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const updateUserData = async (req, res) => {
  try {
    const userId = req.userId; // extracted from verifyUser middleware
    const { firstname, lastname, age, gender, about, skills } = req.body;

    // Validate
    if (!firstname || !lastname) {
      return res.status(400).json({ success: false, message: "Firstname and lastname are required." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname, lastname, age, gender, about, skills },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      userData: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};


export const getSuggestions = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("skills");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // if no skills → no suggestions
        if (!user.skills || user.skills.length === 0) {
            return res.json({ success: true, suggestions: [] });
        }

        const suggestions = await User.find({
            _id: { $ne: userId },
            skills: { $in: user.skills }   // matches ANY skill
        }).select("username skills about profile");

        return res.json({
            success: true,
            suggestions
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Server error fetching suggestions"
        });
    }
};

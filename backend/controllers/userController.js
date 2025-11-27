import User from "../models/User.js";
import Connection from "../models/Connections.js";
import cloudinary from "../config/cloudinary.js";

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
    // console.log("USER ID:", userId);

    const me = await User.findById(userId).select("skills");
    if (!me) {
      return res.status(404).json({ success:false, message:"User not found" });
    }

    // console.log("MY SKILLS:", me.skills);

    const conns = await Connection.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ],
      status: { $in: ["pending", "accepted"] }
    });

    // console.log("CONNECTIONS FOUND:", conns);

    const excludedIds = new Set();
    conns.forEach(c => {
      excludedIds.add(String(c.senderId));
      excludedIds.add(String(c.receiverId));
    });
    excludedIds.add(String(userId));

    // console.log("EXCLUDED IDS:", [...excludedIds]);

    const suggestions = await User.find({
      _id: { $nin: [...excludedIds] },
      skills: { $in: me.skills }
    }).select("firstname lastname username skills about profilePic");

    return res.json({
      success: true,
      suggestions
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:"Server error" });
  }
};


//profile picture update
export const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const userId = req.userId;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "virdev/profile_pics",
          width: 400,
          height: 400,
          crop: "fill",
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      ).end(req.file.buffer);
    });

    await User.findByIdAndUpdate(userId, {
      profilePic: result.secure_url,
    });

    res.json({ success: true, url: result.secure_url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// controllers/ideaController.js
import User from "../models/User.js";
import mongoose from "mongoose";

/**
 * createIdea - add a new idea to user's ideas array
  */
export const createIdea = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { category, title, description } = req.body;
    if (!category || !description || !title) return res.status(400).json({ success: false, message: "Category and description required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const idea = { category, title, description };
    user.ideas.unshift(idea); // newest first
    await user.save();

    // return the added idea (with _id)
    return res.json({ success: true, idea: user.ideas[0], message: "Idea added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error creating idea" });
  }
};


/**
 * getIdeas - list ideas across users
 */

export const getIdeas = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware

    const pipeline = [
      // Only users who have ideas
      { $match: { "ideas.0": { $exists: true } } },

      // Expand each idea into its own document
      { $unwind: "$ideas" },

      // EXCLUDE ideas created by the logged-in user
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },

      // Format the output
      {
        $project: {
          _id: 0,
          ideaId: "$ideas._id",
          category: "$ideas.category",
          title: "$ideas.title",
          description: "$ideas.description",
          createdAt: "$ideas.createdAt",

          authorId: "$_id",
          authorName: { $concat: ["$firstname", " ", "$lastname"] },
          authorSkills: "$skills",
          authorProfile: "$profilePic"
        }
      },

      // Newest first
      { $sort: { createdAt: -1 } }
    ];

    const ideas = await User.aggregate(pipeline);

    return res.json({
      success: true,
      ideas
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch ideas"
    });
  }
};


//getting users ideas
export const getMyIdeas = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("ideas firstname lastname profilePic skills");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      ideas: user.ideas.map(idea => ({
        ideaId: idea._id,
        category: idea.category,
        title: idea.title,
        description: idea.description,
        createdAt: idea.createdAt,
        authorName: `${user.firstname} ${user.lastname}`,
        authorProfile: user.profilePic,
        authorSkills: user.skills
      }))
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Cannot fetch user's ideas" });
  }
};


//deleting ideas

// DELETE /api/user/delete-idea/:ideaId
export const deleteIdea = async (req, res) => {
  try {
    const userId = req.userId;
    const { ideaId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const ideaExists = user.ideas.id(ideaId);
    if (!ideaExists) {
      return res.status(404).json({ success: false, message: "Idea not found" });
    }

    // Remove idea
    user.ideas = user.ideas.filter(i => String(i._id) !== String(ideaId));
    await user.save();

    return res.json({ success: true, message: "Idea deleted successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Failed to delete idea" });
  }
};



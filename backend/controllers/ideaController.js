// controllers/ideaController.js
import User from "../models/User.js";

/**
 * createIdea - add a new idea to user's ideas array
  */
export const createIdea = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { category, description } = req.body;
    if (!category || !description) return res.status(400).json({ success: false, message: "Category and description required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const idea = { category, description };
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
    const { category, page = 1, limit = 20 } = req.query;
    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

    // Build pipeline: unwind user ideas and filter
    const matchStage = {};
    if (category) matchStage["ideas.category"] = category;

    const pipeline = [
      { $match: { "ideas.0": { $exists: true } } }, // users with at least one idea
      { $unwind: "$ideas" },
    ];

    if (category) pipeline.push({ $match: { "ideas.category": category } });

    pipeline.push(
      { $project: {
          _id: 0,
          ideaId: "$ideas._id",
          category: "$ideas.category",
          description: "$ideas.description",
          createdAt: "$ideas.createdAt",
          authorId: "$_id",
          authorName: { $concat: ["$firstname", " ", "$lastname"] },
          authorUsername: "$username",
          authorProfile: "$profilePic",
          authorSkills: "$skills"
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: Number(limit) }
    );

    const results = await User.aggregate(pipeline);

    return res.json({ success: true, ideas: results, page: Number(page) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error fetching ideas" });
  }
};

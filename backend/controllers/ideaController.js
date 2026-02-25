import User from "../models/User.js";
import mongoose from "mongoose";
import Connections from "../models/Connections.js";
import transporter from "../config/nodemailer.js";
import IdeaInterest from "../models/IdeaInterest.js";
import { getIO } from "../socketServer.js";


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
      { $match: { "ideas.0": { $exists: true } } },
      { $unwind: "$ideas" },
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(userId) } } },

       // 🔥 Lookup interest count
      {
        $lookup: {
          from: "ideainterests",
          localField: "ideas._id",
          foreignField: "ideaId",
          as: "interestDocs"
        }
      },

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
          authorProfile: "$profilePic",

          interestCount: { $size: "$interestDocs" }
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

    const user = await User.findById(userId)
      .select("ideas firstname lastname profilePic skills");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const formattedIdeas = [];

    for (const idea of user.ideas) {

      // 🔥 Get all interests for this idea
      const interests = await IdeaInterest.find({
        ideaId: idea._id
      }).populate("senderId", "firstname lastname profilePic skills");

      const interestedUsers = [];

      for (const interest of interests) {

        // Check connection status
        const connection = await Connections.findOne({
          $or: [
            { senderId: interest.senderId._id, receiverId: userId },
            { senderId: userId, receiverId: interest.senderId._id }
          ]
        });

        interestedUsers.push({
          user: interest.senderId,
          isConnected: connection?.status === "accepted",
          hasPending: connection?.status === "pending"
        });
      }

      formattedIdeas.push({
        ideaId: idea._id,
        category: idea.category,
        title: idea.title,
        description: idea.description,
        createdAt: idea.createdAt,

        authorName: `${user.firstname} ${user.lastname}`,
        authorProfile: user.profilePic,
        authorSkills: user.skills,

        interestCount: interests.length,
        interestedUsers
      });
    }

    return res.json({
      success: true,
      ideas: formattedIdeas
    });

  } catch (err) {
    console.log("GetMyIdeas Error:", err);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch user's ideas"
    });
  }
};


// Update ideas
// PUT /api/user/update-idea/:ideaId
export const updateIdea = async (req, res) => {
  try {
    const userId = req.userId;
    const { ideaId } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ideaId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid idea id"
      });
    }

    if (!category || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Category, title and description are required"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Find idea inside embedded array
    const idea = user.ideas.id(ideaId);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found"
      });
    }

    // Update fields
    idea.title = title;
    idea.description = description;
    idea.updatedAt = new Date(); // optional but recommended

    await user.save();

    return res.json({
      success: true,
      message: "Idea updated successfully",
      idea
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error updating idea"
    });
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


//Expressing interest
export const expressInterest = async (req, res) => {
  try {
    const senderId = req.userId;
    const { ideaId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ideaId)) {
      return res.status(400).json({ success: false, message: "Invalid idea id" });
    }

    // Find idea owner
    const owner = await User.findOne({ "ideas._id": ideaId });
    if (!owner) {
      return res.status(404).json({ success: false, message: "Idea not found" });
    }

    if (owner._id.toString() === senderId) {
      return res.status(400).json({ success: false, message: "Cannot interest your own idea" });
    }

    const sender = await User.findById(senderId);

    // 🔥 STEP 1 — CHECK IF ALREADY INTERESTED
    const alreadyInterested = await IdeaInterest.findOne({
      ideaId,
      senderId
    });

    if (alreadyInterested) {
      return res.status(400).json({
        success: false,
        message: "You already expressed interest in this idea"
      });
    }

    // 🔥 STEP 2 — SAVE INTEREST RECORD
    await IdeaInterest.create({
      ideaId,
      senderId,
      ownerId: owner._id
    });

    // 🔥 STEP 3 — CHECK CONNECTION STATUS
    const existing = await Connections.findOne({
      $or: [
        { senderId, receiverId: owner._id },
        { senderId: owner._id, receiverId: senderId }
      ],
      status: { $in: ["pending", "accepted"] }
    });

    let emailMessage = "";
    let createdConnection = null;

    if (existing) {
      if (existing.status === "accepted") {
        emailMessage = `
          <p><strong>${sender.firstname} ${sender.lastname}</strong> is interested in your idea.</p>
        `;
      } else {
        emailMessage = `
          <p><strong>${sender.firstname} ${sender.lastname}</strong> is interested in your idea.</p>
          <p>You already have a pending connection request.</p>
        `;
      }
    } else {
      // 🔥 CREATE CONNECTION IF NOT EXISTS
      createdConnection = await Connections.create({
        senderId,
        receiverId: owner._id,
        message: "I liked your idea and would like to collaborate."
      });

      emailMessage = `
        <p><strong>${sender.firstname} ${sender.lastname}</strong> is interested in your idea and wants to connect with you.</p>
        <p>A connection request has been sent to you.</p>
      `;
    }

    // 🔥 STEP 4 — SEND EMAIL
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: owner.email,
      subject: "Someone is Interested in Your Idea - VirDev",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color:#7c3aed;">Hello ${owner.firstname},</h2>
          ${emailMessage}
          <br/>
          <a href="${process.env.FRONTEND_URL}/requests"
             style="display:inline-block;background:#7c3aed;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;">
             View Requests
          </a>
        </div>
      `
    });

    const io = getIO();

    io.to(owner._id.toString()).emit("idea-interest", {
      ideaId,
      sender: {
        id: senderId._id,
        name: `${sender.firstname} ${sender.lastname}`,
        profilePic: sender.profilePic
      }
    })
    

    return res.status(200).json({
      success: true,
      message: existing
        ? "Interest recorded"
        : "Interest recorded and connection request created",
      connection: createdConnection
    });

  } catch (err) {
    console.error("Interest Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

//Fetch my interested ideas
export const getMyInterestedIdeas = async (req, res) => {
  try {
    const senderId = req.userId;

    const interests = await IdeaInterest.find({ senderId })
    .populate("senderId", "firstname lastname username email profilePic skills")
    .sort({ createdAt: -1 })
    .select("ideaId");

    const ideaIds = interests.map(i => i.ideaId.toString());

    return res.json({
      success: true,
      interestedIdeaIds: ideaIds
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


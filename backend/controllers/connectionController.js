// backend/controllers/connectionController.js
import Connection from "../models/Connections.js";
import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import mongoose from "mongoose";
import { getIO } from "../socketServer.js";   // IMPORTANT
import transporter from "../config/nodemailer.js";


/**
 * POST /api/connections/send/:receiverId
 * body: { message? }
 */
export const sendRequest = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId } = req.params;
    const { message } = req.body;

    // 1. Validation
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ success: false, message: "Invalid receiver id" });
    }
    if (senderId === receiverId) {
      return res.status(400).json({ success: false, message: "Cannot send request to yourself" });
    }

    // 2. Fetch both users simultaneously for efficiency
    const [receiver, sender] = await Promise.all([
      User.findById(receiverId),
      User.findById(senderId)
    ]);

    if (!receiver) {
      return res.status(404).json({ success: false, message: "Receiver not found" });
    }

    // 3. Check for existing connections
    const existing = await Connection.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ],
      status: { $in: ["pending", "accepted"] }
    });

    if (existing) {
      if (existing.status === "pending") {
        return res.status(400).json({ success: false, message: "Request already pending" });
      }
      return res.status(400).json({ success: false, message: "You are already connected" });
    }

    // 4. Save connection to Database
    const connection = new Connection({
      senderId,
      receiverId,
      message: message || ""
    });
    await connection.save();

    // 5. Send Notification Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Must be a verified email in Brevo
      to: receiver.email,
      subject: "New Connection Request - VirDev",
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #7c3aed;">Hello ${receiver.firstname}!</h2>
          <p>You have received a new connection request from <strong>${sender.firstname} ${sender.lastname}</strong>.</p>
          ${message ? `
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #7c3aed; margin: 20px 0;">
              <p style="margin: 0; font-style: italic;">"${message}"</p>
            </div>
          ` : ''}
          <p>Check your requests page to accept or ignore this invitation.</p>
          <a href="${process.env.FRONTEND_URL}/requests" 
             style="display: inline-block; background: #7c3aed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">
             View Request
          </a>
        </div>
      `
    };

    // We use a separate try/catch for the email so that even if the email fails, 
    // the user's connection request remains successful in the database.
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("Email Service Error:", mailErr);
      // Optional: Inform frontend that mail failed but request worked
      return res.status(201).json({ 
        success: true, 
        message: "Request sent, but email notification failed.", 
        request: connection 
      });
    }

    return res.status(201).json({ success: true, message: "Request sent", request: connection });

  } catch (err) {
    console.error("Connection Controller Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PUT /api/connections/accept/:requestId
 */
export const acceptRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid request id" });
    }

    const request = await Connection.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (String(request.receiverId) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not authorized to accept this request" });
    }

    // update status
    request.status = "accepted";
    await request.save();

    const senderId = request.senderId.toString();
    const receiverId = request.receiverId.toString();

    // -----------------------------------------
    // CREATE / GET CONVERSATION
    // -----------------------------------------
    let convo = await Conversation.findOne({
      participants: { $all: [senderId, receiverId], $size: 2 }
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    // -----------------------------------------
    // SEND SOCKET EVENTS
    // -----------------------------------------
    const io = getIO();
    if (io) {
      io.to(senderId).emit("connection-accepted", {
        conversationId: convo._id.toString(),
        by: receiverId
      });

      io.to(receiverId).emit("connection-accepted", {
        conversationId: convo._id.toString(),
        by: receiverId
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request accepted",
      request,
      conversationId: convo._id
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PUT /api/connections/reject/:requestId
 */
export const rejectRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid request id" });
    }

    const request = await Connection.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (
      String(request.receiverId) !== String(userId) &&
      String(request.senderId) !== String(userId)
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ success: true, message: "Request rejected", request });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/connections/incoming
 */
// export const getIncomingRequests = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const requests = await Connection.find({ receiverId: userId, status: "pending" })
//       .populate("senderId", "firstname lastname username email profilePic skills");

//     return res.json({ success: true, requests });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };




// /**
//  * GET /api/connections/outgoing
//  */
// export const getOutgoingRequests = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const requests = await Connection.find({ senderId: userId, status: "pending" })
//       .populate("receiverId", "firstname lastname username email profilePic skills");

//     return res.json({ success: true, requests });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const getIncomingRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await Connection.find({
      receiverId: userId,
      status: "pending"
    })
      .populate("senderId", "firstname lastname username email profilePic skills")
      .lean();

    // 🔥 Remove broken references
    const filtered = requests.filter(r => r.senderId !== null);

    return res.json({ success: true, requests: filtered });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




/**
 * GET /api/connections/list
 * list of accepted connections
 */
// export const getAcceptedConnections = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const connections = await Connection.find({
//       status: "accepted",
//       $or: [{ senderId: userId }, { receiverId: userId }]
//     }).populate("senderId receiverId", "firstname lastname username skills about profilePic");

//     const formatted = connections.map(conn => {
//       return conn.senderId._id.toString() === userId
//         ? conn.receiverId
//         : conn.senderId;
//     });

//     return res.json({ success: true, connections: formatted });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };


export const getOutgoingRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await Connection.find({
      senderId: userId,
      status: "pending"
    })
      .populate("receiverId", "firstname lastname username email profilePic skills")
      .lean();

    // 🔥 Remove broken references
    const filtered = requests.filter(r => r.receiverId !== null);

    return res.json({ success: true, requests: filtered });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAcceptedConnections = async (req, res) => {
  try {
    const userId = req.userId;

    const connections = await Connection.find({
      status: "accepted",
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).populate(
      "senderId receiverId",
      "firstname lastname username skills about profilePic"
    );

    const formatted = connections
      .map((conn) => {
        if (!conn.senderId || !conn.receiverId) return null;

        return conn.senderId._id.toString() === userId
          ? conn.receiverId
          : conn.senderId;
      })
      .filter(Boolean); // removes null entries

    return res.json({ success: true, connections: formatted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

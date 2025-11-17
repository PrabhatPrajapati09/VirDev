// backend/controllers/connectionController.js
import Connection from "../models/Connections.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/**
 * POST /api/connections/send/:receiverId
 * body: { message? }
 */
export const sendRequest = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId } = req.params;
    const { message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ success: false, message: "Invalid receiver id" });
    }
    if (senderId === receiverId) {
      return res.status(400).json({ success: false, message: "Cannot send request to yourself" });
    }

    // check that receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ success: false, message: "Receiver not found" });
    }

    // check if existing connection exists (pending or accepted)
    const existing = await Connection.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId } // opposite direction
      ],
      status: { $in: ["pending", "accepted"] } // ignore old rejections
    });

    if (existing) {
      if (existing.status === "pending") {
        return res.status(400).json({ success: false, message: "Request already pending" });
      }
      if (existing.status === "accepted") {
        return res.status(400).json({ success: false, message: "You are already connected" });
      }
    }

    const connection = new Connection({
      senderId,
      receiverId,
      message: message || ""
    });

    await connection.save();

    return res.status(201).json({ success: true, message: "Request sent", request: connection });
  } catch (err) {
    console.error(err);
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

    request.status = "accepted";
    await request.save();

    return res.status(200).json({ success: true, message: "Request accepted", request });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PUT /api/connections/reject/:requestId
 * (also used for cancel by sender if they want)
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

    // allow either receiver to reject, or sender to cancel
    if (String(request.receiverId) !== String(userId) && String(request.senderId) !== String(userId)) {
      return res.status(403).json({ success: false, message: "Not authorized to reject/cancel this request" });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ success: true, message: "Request rejected/cancelled", request });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/connections/incoming
 * returns pending requests where receiverId = current user
 */
export const getIncomingRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await Connection.find({ receiverId: userId, status: "pending" })
      .populate("senderId", "firstname lastname username email profilePic skills") // pick fields you need
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/connections/outgoing
 * pending requests sent by me
 */
export const getOutgoingRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await Connection.find({ senderId: userId, status: "pending" })
      .populate("receiverId", "firstname lastname username email profilePic skills")
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/connections/list
 * returns accepted connections involving user
 */
export const getAcceptedConnections = async (req, res) => {
  try {
    const userId = req.userId;

    const connections = await Connection.find({
      status: "accepted",
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
    .populate("senderId receiverId", "firstname lastname username skills about profilePic");

    const formatted = connections.map(conn => {
      const isSender = conn.senderId._id.toString() === userId;
      return isSender ? conn.receiverId : conn.senderId;
    });

    return res.json({
      success: true,
      connections: formatted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message:"Server error" });
  }
};
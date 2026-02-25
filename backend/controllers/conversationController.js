import Conversation from "../models/Conversation.js";

export const getConversation = async (req, res) => {
  try {
    const userId = req.userId;
    const { otherUserId } = req.params;

    let convo = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] }
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [userId, otherUserId],
        messages: []
      });
    }

    return res.json({
      success: true,
      conversationId: convo._id,
      messages: convo.messages
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

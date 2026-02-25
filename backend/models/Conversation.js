import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    replyTo: {
      text: String,
      sender: String,
      _id: String
    }
  },
  { _id: true } // ⬅ EVERY MESSAGE GETS UNIQUE ID (IMPORTANT)
);

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);

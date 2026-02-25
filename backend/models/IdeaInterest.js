import mongoose from "mongoose";

const ideaInterestSchema = new mongoose.Schema(
  {
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

// Prevent duplicate interest
ideaInterestSchema.index({ ideaId: 1, senderId: 1 }, { unique: true });

export default mongoose.model("IdeaInterest", ideaInterestSchema);
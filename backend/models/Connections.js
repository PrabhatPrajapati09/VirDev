import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },

    receiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "accepted", "rejected"], 
        default: "pending" 
    },
    message: {
        type: String,
        default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Connection", connectionSchema);

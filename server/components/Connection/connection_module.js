import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    connectionType: { type: String, enum: ["offer", "need", "project"], required: true },
  },
  {
    timestamps: true,
  }
);

const ConnectionModel = mongoose.model("Connection", connectionSchema);

export default ConnectionModel;

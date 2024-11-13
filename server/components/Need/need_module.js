import mongoose from "mongoose";

const needSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Funding", "Networking", "Collaboration", "Mentorship", "Awareness"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending",
  },
});

const NeedModule = mongoose.model("need", needSchema);

export default NeedModule;

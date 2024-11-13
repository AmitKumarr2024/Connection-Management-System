import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    timeline: { startDate: Date, endDate: Date },
    associatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    resourcesNeeded: [String],
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("project", projectSchema);

export default ProjectModel;

import mongoose from "mongoose";  // Import mongoose to interact with MongoDB

// Define the schema for the Project model
const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },  // The name of the project (required)
    description: { type: String, required: true },  // The description of the project (required)
    timeline: { startDate: Date, endDate: Date },  // Start and end date of the project
    associatedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Users associated with the project, referencing the "User" model
    resourcesNeeded: [String],  // List of resources required for the project
    status: {
      type: String,
      enum: ["active", "completed", "paused"],  // The status of the project, which can be "active", "completed", or "paused"
      default: "active",  // Default status is "active"
    },
  },
  { timestamps: true }  // Automatically adds "createdAt" and "updatedAt" fields
);

// Create the Project model using the defined schema
const ProjectModel = mongoose.model("project", projectSchema);

// Export the Project model so it can be used in other parts of the application
export default ProjectModel;

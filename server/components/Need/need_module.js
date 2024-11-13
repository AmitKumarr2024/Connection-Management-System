import mongoose from "mongoose";  // Import mongoose to interact with MongoDB

// Define the schema for the "Need" model
const needSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // The userId is an ObjectId from the User model
    ref: "User",  // This references the "User" model to link the need to a specific user
    required: true,  // The userId is required when creating a need
  },
  description: {
    type: String,  // The description is a string
    required: true,  // The description is required when creating a need
  },
  category: {
    type: String,  // The category is a string
    enum: ["Funding", "Networking", "Collaboration", "Mentorship", "Awareness"],  // The category must be one of these values
    required: true,  // The category is required when creating a need
  },
  status: {
    type: String,  // The status is a string
    enum: ["Pending", "Resolved"],  // The status can either be "Pending" or "Resolved"
    default: "Pending",  // By default, the status is "Pending"
  },
});

// Create the "Need" model using the schema
const NeedModule = mongoose.model("need", needSchema);

// Export the Need model for use in other parts of the application
export default NeedModule;

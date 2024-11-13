import mongoose from "mongoose";  // Import mongoose to work with MongoDB schemas and models

// Define the schema for the "Connection" model
const connectionSchema = new mongoose.Schema(
  {
    // Define the first user in the connection (user1) as an ObjectId referencing the "User" model
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // Define the second user in the connection (user2) as an ObjectId referencing the "User" model
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // Define the status of the connection, which can be "pending", "accepted", or "rejected", with a default value of "pending"
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],  // Enum ensures only these values are allowed
      default: "pending",  // Default value is "pending"
    },
    
    // Define the type of the connection (e.g., "offer", "need", or "project")
    connectionType: { type: String, enum: ["offer", "need", "project"], required: true },
  },
  {
    // Add automatic timestamps (createdAt and updatedAt) to the schema
    timestamps: true,
  }
);

// Create the "Connection" model based on the schema
const ConnectionModel = mongoose.model("Connection", connectionSchema);

// Export the "Connection" model to be used in other parts of the application
export default ConnectionModel;

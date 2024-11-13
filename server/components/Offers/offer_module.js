import mongoose from "mongoose";  // Import the mongoose library to interact with MongoDB

// Define the schema for an "Offer" document
const offerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // The user ID will be an ObjectId, referring to the User model
    ref: "User",  // Reference to the "User" model
    required: true,  // This field is required
  },
  title: {
    type: String,  // The title of the offer will be a string
    required: true,  // This field is required
  },
  description: {
    type: String,  // The description of the offer will be a string
    required: true,  // This field is required
  },
  tags: {
    type: [String],  // Tags will be an array of strings (optional)
    required: false,  // This field is optional
  },
  createdAt: {
    type: Date,  // The date when the offer is created
    default: Date.now,  // If no date is provided, the current date and time will be used
  },
});

// Create a model for the "Offer" collection in the database
const OfferModel = mongoose.model("Offer", offerSchema);

// Export the model to use it in other parts of the application
export default OfferModel;

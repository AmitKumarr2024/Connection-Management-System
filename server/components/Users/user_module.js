import mongoose from "mongoose";  // Import mongoose to interact with MongoDB

// Define the user schema for the database
const userSchema = new mongoose.Schema(
  {
    // 'fullName' is required and must be a string
    fullName: { type: String, required: true },

    // 'email' is required, must be a unique value, and must match a valid email format
    email: {
      type: String,
      required: true,  // The email field is required
      unique: true,    // No two users can have the same email
      validate: {
        // Email format validation using a regular expression
        validator: function (email) {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailRegex.test(email);  // Checks if the email matches the regex pattern
        },
        message: (props) => `${props.value} is not a valid email format!`,  // Custom error message if the email format is invalid
      },
    },

    // 'gender' is required and must be either 'male' or 'female'
    gender: { type: String, required: true, enum: ["male", "female"] },

    // 'role' defines the type of user: individual, business, or organization
    role: {
      type: String,
      enum: ["individual", "business", "organization"],  // Only these values are allowed
    },

    // 'profilePic' is optional and defaults to "default-pic-url.jpg" if not provided
    profilePic: { type: String, default: "default-pic-url.jpg" },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields to the schema
);

// Create a Mongoose model based on the user schema
const UserModel = mongoose.model("User", userSchema);

// Export the UserModel so it can be used in other parts of the application
export default UserModel;

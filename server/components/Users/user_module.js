import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailRegex.test(email);
        },
        message: (props) => `${props.value} is not a valid email format!`,
      },
    },
    gender: { type: String, required: true, enum: ["male", "female"] },
    role: {
      type: String,

      enum: ["individual", "business", "organization"],
    },
    profilePic: { type: String, default: "default-pic-url.jpg" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

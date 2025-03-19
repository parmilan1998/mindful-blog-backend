import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username can be a maximum of 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    fullName: {
      type: String,
      required: true,
      maxlength: [100, "Full name can be a maximum of 100 characters"],
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio can be a maximum of 500 characters"],
    },
    phoneNumber: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

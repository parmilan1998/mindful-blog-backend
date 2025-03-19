import User from "../models/user.models.js";
import { generateTokens } from "../utils/generateToken.js";
import {
  refreshTokenSchema,
  signInSchema,
  signUpSchema,
} from "../utils/validationSchema.js";
import bcrypt from "bcrypt";
import UserToken from "../models/userToken.model.js";

export const signUpUser = async (req, res) => {
  try {
    //TODO: Validation check
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, username, password } = req.body;

    //TODO: Check email already exist
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(401).json({ message: "Email already exists" });
    }

    //TODO: Check username already exist
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(401).json({ message: "Username already exists" });
    }

    //TODO: Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //TODO: Create a new user with hashed password
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();
    return res
      .status(201)
      .json({ user: newUser, message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signInUser = async (req, res) => {
  try {
    //TODO: Validation check
    const { error } = signInSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    //TODO: Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //TODO: compare the password and hash password
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(200).json({
      user,
      accessToken,
      refreshToken,
      message: "User signed in successfully",
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    //TODO: Check if the provided refresh token exists in the database
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });

    //TODO: If the token is not found,(assuming the user is already logged out)
    if (!userToken) {
      return res
        .status(200)
        .json({ error: false, message: "Already user Logged out.." });
    }

    //TODO: Delete the found refresh token from the database
    await userToken.deleteOne();
    res.status(200).json({ error: false, message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

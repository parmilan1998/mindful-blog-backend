import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
} from "../config/env.js";
import UserToken from "../models/userToken.model.js";

export const generateTokens = async (user) => {
  try {
    //TODO: Generate an access token (valid for 15 minutes)
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "15m" }
    );

    //TODO: Generate a refresh token (valid for 30 days)
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "30d",
    });

    //TODO: Check if a refresh token already exists for the user
    const existingToken = await UserToken.findOne({ userId: user._id });
    if (existingToken) {
      //TODO: Remove existing token
      await existingToken.deleteOne();
    }

    //TODO: Create and store the new refresh token in the database
    const newUserToken = new UserToken({
      userId: user._id,
      token: refreshToken,
    });

    //TODO: Save the new refresh token to the database
    await newUserToken.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Token generation failed");
  }
};

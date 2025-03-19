import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_PRIVATE_KEY } from "../config/env.js";
import UserToken from "../models/userToken.model.js";

const verifyRefreshToken = async (refreshToken) => {
  try {
    //TODO: Check the given refresh token exists in the database
    const storeToken = await UserToken.findOne({ token: token });
    console.log({ storeToken });
    console.log({ refreshToken });

    if (storeToken !== refreshToken) {
      throw new Error("Invalid or expired refresh token");
    }
    //TODO: Verify the token using the refresh token & secret private key
    const tokenDetails = jwt.verify(refreshToken, REFRESH_TOKEN_PRIVATE_KEY);

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export default verifyRefreshToken;

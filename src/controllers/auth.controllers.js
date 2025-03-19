import { ACCESS_TOKEN_PRIVATE_KEY } from "../config/env.js";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefereshToken.js";
import { refreshTokenSchema } from "../utils/validationSchema.js";

export const verifyToken = async (req, res) => {
  try {
    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //TODO: Verify the provided refresh token and its details
    const { tokenDetails } = await verifyRefreshToken(req.body.refreshToken);

    //TODO: Create a payload (user's ID and email)
    const payload = { id: tokenDetails._id, email: tokenDetails.email };

    //TODO: Generate a new access token valid for 14 minutes
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "14m",
    });

    res.status(200).json({
      error: false,
      accessToken,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

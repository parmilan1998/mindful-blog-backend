import express from "express";
import {
  signUpUser,
  signInUser,
  logoutUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);
authRouter.post("/verify-token", verifyToken);
authRouter.post("/logout", logoutUser);

export default authRouter;

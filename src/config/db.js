import mongoose from "mongoose";
import { MONGO_URL } from "../config/env.js";
import chalk from "chalk";

export const connectDatabase = async () => {
  if (!MONGO_URL) {
    console.error(
      chalk.red("❌ MongoDB URL is not defined in environment variables")
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL);

    mongoose.connection.on("disconnected", () => {
      console.log(chalk.yellow("⚠️ MongoDB connection disconnected"));
    });

    mongoose.connection.on("reconnected", () => {
      console.log(chalk.magenta("🔄 MongoDB reconnected"));
    });

    console.log(
      chalk.magentaBright.bold("✅ Database connected successfully!")
    );
  } catch (error) {
    console.error(chalk.red("❌ Database connection failed:", error));
    process.exit(1);
  }
};

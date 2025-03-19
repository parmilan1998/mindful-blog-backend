import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import { MONGO_URL, PORT, NODE_ENV } from "./config/env.js";
import chalk from "chalk";
import userRoute from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(
  express.json({ limit: "50mb", type: "application/json", strict: true })
); // Default limit 100kb and allowed objects and arrays
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000 })
);
app.use(express.static("public"));

// Routes
app.use("/api/v1/auth", userRoute);

const startServer = async () => {
  try {
    if (!PORT || !MONGO_URL) {
      console.error("❌ PORT or MONGO_URL is not set in environment variables");
      process.exit(1);
    }

    await connectDatabase();

    app.listen(Number(PORT), () => {
      console.log(
        chalk.cyan.bold(
          `🚀 Server is running on http://localhost:${Number(
            PORT
          )} in ${NODE_ENV} mode`
        )
      );
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1);
  }
};

startServer();

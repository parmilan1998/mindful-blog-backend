import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const {
  PORT,
  NODE_ENV,
  MONGO_URL,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
} = process.env;

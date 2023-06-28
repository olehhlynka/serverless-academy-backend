import dotenv from "dotenv";
dotenv.config();

const PORT: number =
  parseInt(process.env.PORT as string, 10) || 3000;
const DB_PASSWORD = process.env.DB_PASSWORD || "qwerty";
const DB_USER = process.env.DB_USER || "postgres";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT: number =
  parseInt(process.env.DB_PORT as string, 10) || 5432;
const DB_NAME = process.env.DB_NAME || "auth_db";
const SALT_ROUNDS = 10;
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "";
const TOKEN_TTL = process.env.TOKEN_TTL || "60m";

export {
  PORT,
  DB_PASSWORD,
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SALT_ROUNDS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_TTL,
};

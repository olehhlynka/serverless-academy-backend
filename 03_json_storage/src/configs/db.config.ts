import mongoose from "mongoose";
import { DB_URL } from "./constants.config";
import { DBConnectionError } from "../errors/db.error";

try {
  mongoose.connect(DB_URL);
} catch (error: any) {
  throw new DBConnectionError(
    "Failed to connect to the database"
  );
}

const db = mongoose.connection;

export { db };

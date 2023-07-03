import { DB } from "./constants.config";
import { Pool } from "pg";

const pool = new Pool({
  user: DB.USER,
  password: DB.PASSWORD,
  host: DB.HOST,
  port: DB.PORT,
  database: DB.NAME,
});

export default pool;

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} = require("./constants");
const { Pool } = require("pg");

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

module.exports = pool;

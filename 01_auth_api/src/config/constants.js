module.exports = {
  PORT: process.env.PORT || 3000,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "qwerty",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || "auth_db",
  SALT_ROUNDS: 10,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  TOKEN_TTL: process.env.TOKEN_TTL,
};

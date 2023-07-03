const PORT = process.env.PORT || 3000;
const DB_PASSWORD =
  process.env.DB_PASSWORD || "ochmativ1715.";
const DB_USER = process.env.DB_USER || "kostetsku1234321";
const DB_NAME = process.env.DB_NAME || "jsonbase";
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.1nlo23p.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export { PORT, DB_URL };

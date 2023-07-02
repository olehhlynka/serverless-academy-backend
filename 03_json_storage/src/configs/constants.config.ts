const PORT = process.env.PORT || 3000;
const DB_PASSWORD =
  process.env.DB_PASSWORD || "AbuIJ82KFF1HR71T";
const DB_USER = process.env.DB_USER || "olehhlyhnka";
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.i53y3fw.mongodb.net/?retryWrites=true&w=majority`;

export { PORT, DB_URL };

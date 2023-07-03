import express, { Express } from "express";
import path from "path";
import documentRouter from "./src/routers/document.router";
import { PORT } from "./src/configs/constants.config";
import { db } from "./src/configs/db.config";
import { notFoundHandler } from "./src/middlewares/notFoundHandler.middleware";
import { jsonErrorHandler } from "./src/middlewares/jsonErrorHandler.middleware";

const app: Express = express();

db.on("connected", () => {
  console.log("Mongoose connected to the database");
});

db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(jsonErrorHandler);
app.use(documentRouter);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`[server] Server is running on port ${PORT}`);
});

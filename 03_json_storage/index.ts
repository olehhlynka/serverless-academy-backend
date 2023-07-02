import express, { Express } from "express";
import path from "path";
import documentRouter from "./src/routers/document.router";
import { PORT } from "./src/configs/constants.config";

const app: Express = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(documentRouter);

app.listen(PORT, () => {
  console.log(`[server] Server is running on port ${PORT}`);
});

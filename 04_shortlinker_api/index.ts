import express, { Express } from "express";
import { App } from "./src/configs/constants.config";
import linkRouter from "./src/routers/link.router";

const app: Express = express();

app.use(express.json());
app.use(linkRouter);

app.listen(App.PORT, () => {
  console.log(
    `[server] Server is running on port ${App.PORT}`
  );
});

import express, { Express } from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app: Express = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("", userRouter);

export default app;

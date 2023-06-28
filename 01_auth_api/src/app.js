require("dotenv").config();
const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use(express.json());
app.use("/auth", authRoute);
app.use("/", userRoute);

module.exports = app;

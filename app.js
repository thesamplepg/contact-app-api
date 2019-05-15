const express = require("express");
const bodyParse = require("body-parser");
const path = require("path");
const { logger } = require("./utilits/middleWares");
const cors = require("cors");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(logger);

app.use("/api", require("./routes"));

module.exports = app;

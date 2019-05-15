const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

module.exports = app;

const mongoose = require("mongoose");

module.exports = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.NODE_MONGO_URI,
      { useNewUrlParser: true },
      err => {
        if (err) reject(err);

        resolve("--[ MongoDB connected ]--");
      }
    );
  });

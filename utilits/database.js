const mongoose = require("mongoose");

module.exports.connect = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const { Mockgoose } = require("mockgoose");
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(process.env.NODE_MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
          })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          });
      });
    } else {
      mongoose.connect(
        process.env.NODE_MONGO_URI,
        { useNewUrlParser: true },
        err => {
          if (err) return reject(err);

          resolve("--[ MongoDB connected ]--");
        }
      );
    }
  });

module.exports.close = () => {
  return mongoose.disconnect();
};

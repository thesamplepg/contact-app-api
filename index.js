const bodyParse = require("body-parser");
const { logger } = require("./utilits/middleWares");
const cors = require("cors");

const { connect } = require("./utilits/database");
const app = require("./app");

app.set("view engine", "ejs");

app.use(logger);

connect()
  .then(res => {
    console.log(res);

    app.listen(process.env.PORT || 5000, () => {
      console.log("--[ Server has started ]--");
    });
  })
  .catch(err => {
    console.log("Error " + err);
  });

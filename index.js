const { connect } = require("./utilits/database");
const app = require("./app");

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

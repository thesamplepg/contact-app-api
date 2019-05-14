const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  image: {
    url: {
      type: String
    },
    id: {
      type: String
    }
  }
});

module.exports = mongoose.model("contact", ContactSchema);

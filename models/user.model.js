const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    dbAddress: {
      type: String,
    },
  })
);

module.exports = User;

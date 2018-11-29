const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  id_token: String,
  campaign: [{address: String}],
  contributeIn: [{address: String}]
});

module.exports = mongoose.model("User", userSchema);
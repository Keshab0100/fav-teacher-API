const mongoose = require("mongoose");

const favSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sid: String,
  tid: String,
});

module.exports = mongoose.model("favList", favSchema);

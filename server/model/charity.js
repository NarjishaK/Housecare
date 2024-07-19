const mongoose = require("mongoose");

const charitySchema = mongoose.Schema({
  charity: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
});

const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;

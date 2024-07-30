const mongoose = require("mongoose");

const charitySchema = mongoose.Schema({
  charity: { type: String, required: true },
  arbic: { type: String, required: true },
  CR_NO: { type: String, required: true },
  VAT_REG_NO: { type: String, required: true },
  phone: { type: Number, required: true },
  authorizedperson: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  role: { type: String, required: true },
});

const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;

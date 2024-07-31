const mongoose = require("mongoose");

const benificiarySchema = mongoose.Schema({
  benificiary_name: { type: String, required: true },
  number: { type: Number, required: true },
  email_id: { type: String, required: true },
  charity_name: { type: String, required: true },
  nationality: { type: String, required: true },
  sex: { type: String, required: true },
  health_status: { type: String, required: true },
  marital: { type: String, required: true },
  navision_linked_no: { type: String, required: true },
  physically_challenged: { type: String, required: true },
  family_members: { type: Number, required: true },
  account_status: { type: String, required: true },
  Balance: { type: Number, required: true },
});

const Benficiaries = mongoose.model("Benficiaries", benificiarySchema);
module.exports = Benficiaries;

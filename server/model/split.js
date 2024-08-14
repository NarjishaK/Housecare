const mongoose = require("mongoose");

const splitSchema = mongoose.Schema({
    totalamount: { type: Number, required: true },
    splitamount: { type: Number, required: true },
    beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "Benficiaries",required: true},  
    date: { type: String, default: Date.now }, 
});

const Splits = mongoose.model("Splits", splitSchema);
module.exports = Splits;

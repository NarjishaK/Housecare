const mongoose = require("mongoose");

const benificiarySchema = mongoose.Schema({
  benificiary_id: { type: String, unique: true }, // Add the unique benificiary_id field
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
  category: { type: String, required: true },
  age: { type: Number, required: true },
  // debitedDate: { type: Date }, 
  // debitedAmount: { type: Number, default: 0 },
  // totalamount: { type: Number, default: 0 },
  // transactionId: { type: String },
}, { timestamps: true });

// Pre-save middleware to generate unique beneficiary_id
benificiarySchema.pre("save", async function (next) {
  const benificiary = this;

  if (benificiary.isNew) {
    // Find the last created benificiary to determine the next ID
    const lastBenificiary = await this.constructor.findOne({}).sort({ createdAt: -1 });

    let newId = "BENF00001"; // Default to the first ID

    if (lastBenificiary && lastBenificiary.benificiary_id) {
      // Extract the numeric part and increment it
      const lastId = lastBenificiary.benificiary_id;
      const lastNum = parseInt(lastId.substring(4), 10); // Get the numeric part
      const nextNum = (lastNum + 1).toString().padStart(5, "0"); // Increment and pad with leading zeros
      newId = `BENF${nextNum}`;
    }

    benificiary.benificiary_id = newId; // Set the new ID
  }

  next(); // Continue with the save operation
});

const Benficiaries = mongoose.model("Benficiaries", benificiarySchema);
module.exports = Benficiaries;

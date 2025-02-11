const mongoose = require("mongoose");
const Charity = require("./charity"); // Import the Charity model

const benificiarySchema = mongoose.Schema(
  {
    benificiary_id: { type: String, unique: true }, // Unique benificiary ID with charity prefix
    benificiary_name: { type: String, required: true },
    number: { type: Number, required: true },
    email_id: { type: String, required: true },
    charity_name: { type: String, required: true },
    nationality: { type: String, required: true },
    sex: { type: String, required: true },
    health_status: { type: String, required: true },
    marital: { type: String, required: true },
    navision_linked_no: { type: String },
    physically_challenged: { type: String, required: true },
    family_members: { type: Number, required: true },
    account_status: { type: String, required: true },
    date: { type: Date, default: Date.now },
    Balance: { type: Number },
    category: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

// Pre-save middleware to generate unique beneficiary_id with charity prefix
benificiarySchema.pre("save", async function (next) {
  const benificiary = this;

  if (benificiary.isNew) {
    try {
      // Find the charity using charity_name
      const charity = await Charity.findOne({ charity: benificiary.charity_name });

      if (!charity) {
        return next(new Error("Charity not found!"));
      }

      const charityPrefix = charity.prifix; // Get the prefix from the charity
      if (!charityPrefix) {
        return next(new Error("Charity prefix not found!"));
      }

      // Find the last beneficiary for this charity to determine the next ID
      const lastBenificiary = await this.constructor
        .findOne({ charity_name: benificiary.charity_name })
        .sort({ createdAt: -1 });

      let newIdNumber = "00001"; // Default first ID

      if (lastBenificiary && lastBenificiary.benificiary_id) {
        // Extract the numeric part and increment it
        const lastId = lastBenificiary.benificiary_id.replace(charityPrefix, "");
        const lastNum = parseInt(lastId, 10) || 0; // Get the numeric part safely
        const nextNum = (lastNum + 1).toString().padStart(5, "0"); // Increment and pad with leading zeros
        newIdNumber = nextNum;
      }

      benificiary.benificiary_id = `${charityPrefix}${newIdNumber}`; // Combine prefix with new ID
    } catch (error) {
      return next(error);
    }
  }

  next(); // Continue with the save operation
});

const Benificiaries = mongoose.model("Benificiaries", benificiarySchema);
module.exports = Benificiaries;

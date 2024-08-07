const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
  password: { type: String, required: true },
  tokens: { type: String, default: "" },
});

charitySchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (!this.password.startsWith("$2b$")) {
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
      } catch (err) {
        console.log(err.message, "something went wrong in password hashing");
        return next(err);
      }
    } else {
      console.log("Password is already hashed.");
      return next();
    }
  } else {
    return next();
  }
}); 
const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;

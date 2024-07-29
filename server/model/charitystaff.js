const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const charitystaffSchema = mongoose.Schema({
  phone: { type: Number, required: true },
  charity: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
});

charitystaffSchema.pre("save", async function (next) {
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

const Charitystaff = mongoose.model("CharityAdmin", charitystaffSchema);
module.exports = Charitystaff;

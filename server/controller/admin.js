const Superadmin = require("../model/housecareadmin");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signinadmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const superadmin = await Superadmin.findOne({ email: email });
    if (!superadmin) {
      console.log("admin not found with email:", email);
      return res
        .status(400)
        .json({ invalid: true, message: "Invalid email or password" });
    }
    const isPasswordIsMatch = await bcrypt.compare(
      password,
      superadmin.password
    );
    if (superadmin && isPasswordIsMatch) {
      const Superadmin = {
        admin: superadmin.admin,
        email: superadmin.email,
        image: superadmin.image,
        id:superadmin._id
      };
      const token = jwt.sign({ email: superadmin.email }, "myjwtsecretkey");
      superadmin.tokens = token;
      await superadmin.save();
      console.log("Signin successful, token generated");
      res.status(200).json({ token: token, Superadmin: Superadmin });
    } else {
      console.log("Password mismatch for email:", email);
      return res
        .status(400)
        .json({ invalid: true, message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err, "signin  failed");
    return res.status(500).json({ err: "Invalid email or password" });
  }
});

exports.lists = asyncHandler(async (req, res) => {
  try {
    const admins = await Superadmin.findOne();
    res.json(admins);
  } catch (err) {
    console.log(err, "Error listing admins");
    return res.status(500).json({ err: "Error listing admins" });
  }
});

exports.edit =asyncHandler(async(req,res)=>{
const {id}= req.params
try{
const admins = await Superadmin.findById(id)
if(!admins){
  return res.status(400).json({message:"Admin not found "})
}
res.json(admins)
}catch(err){
  console.log(err,"fetching admin details failed");
  return res.status(500).json({message:"an error occured in fetching admin details"})
}
})

exports.updateAdmin = asyncHandler(async (req, res) => {
  const { admin, email } = req.body;
  const { id } = req.params;
  try {
    const admins = await Superadmin.findById(id);
    if (!admins) {
      return res.status(400).json({ message: "admin not found for update" });
    }
    admins.email = email;
    admins.admin = admin;
    if (req.file) {
      admins.image = req.file.filename;
    }
    const adminUpdate = await admins.save();
    res.json(adminUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured" });
  }
});
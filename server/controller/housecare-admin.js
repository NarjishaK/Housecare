const asyncHandler = require("express-async-handler");
const Staffs = require("../model/housecare-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = asyncHandler(async (req, res) => {
  const { staff, email, password,date } = req.body;
  const image = req.file.filename;

  try {
    const admins = await Staffs.findOne({ email });
    if (admins) {
      return res
        .status(400)
        .json({ invalid: true, message: "email is already exist" });
    }
    const admin = await Staffs.create({
      staff: staff,
      password: password,
      email: email,
      date:date,
      image: image,
    });
    if (!admin) {
      console.log("Admin creation failed");
      res.send("Failed");
    } else {
      res.send("Success");
    }
  } catch (err) {
    console.log(err, "craetion failed");
    return res
      .status(400)
      .json({ err: "something went wrong in Admin creation" });
  }
});

exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Staffs.findOne({ email: email });
    if (!admin) {
      console.log("Admin not found with email:", email);
      return res
        .status(400)
        .json({ invalid: true, message: "Invalid email or password" });
    }
    const isPasswordIsMatch = await bcrypt.compare(password, admin.password);
    if (admin && isPasswordIsMatch) {
      const HomecareAdmin = {
        staff: admin.staff,
        email: admin.email,
        image: admin.image,
        date:admin.date,
      };
      const token = jwt.sign({ email: admin.email }, "myjwtsecretkey");
      admin.tokens = token;
      await admin.save();
      console.log("Signin successful, token generated");
      res.status(200).json({ token: token, HomecareAdmin: HomecareAdmin });
    }else {
      console.log("Password mismatch for email:", email);
      return res.status(400).json({ invalid: true, message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err, "signin  failed");
    return res.status(500).json({ err: "Invalid email or password" });
  }
});

exports.list = asyncHandler(async (req, res) => {
  try {
    const admin = await Staffs.find();
    if (!admin) {
      console.log("something went wrong in admin list");
      return res
        .status(400)
        .json({ message: "admin listing failed something went wrong" });
    }
    res.json(admin);
  } catch (err) {
    console.log(err, "admin listing failed");
    return res.status(500).json({ err: "Admin listing failed" });
  }
});

exports.edit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Staffs.findById(id);
    if (!admin) {
      console.log("something went wrong in Edit by Id");
      return res.status(400).json({
        message: "an error occured in edit by Id Can't found the admin",
      });
    }
    res.json(admin);
  } catch (err) {
    console.log(err, "an error occured in edit by Id");
    return res
      .status(500)
      .json({ err: "an error occured in Admin details edit by Id" });
  }
});

exports.update = asyncHandler(async (req, res) => {
  const { staff, email, password ,date} = req.body;
  const { id } = req.params;
  try {
    const admin = await Staffs.findById(id);
    if (!admin) {
      console.log("admin not found");
      return res.status(400).json({ message: "Admin not found to update" });
    }
    admin.email = email;
    admin.password = password;
    admin.staff = staff;
    admin.date = date;
    if (req.file) {
      admin.image = req.file.filename;
    }
    const updateAdmin = await admin.save();
    res.json({ updateAdmin });
  } catch (err) {
    console.log(err, "an error occured in admin updation");
    return res
      .status(500)
      .json({ message: "an error occured in admin updation " });
  }
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Staffs.findById(id);
    if (!admin) {
      console.log("admin not found");
      return res.status(400).json({ message: "Admin not found to delete" });
    } else {
      await admin.deleteOne();
      res.json({ message: "delete successfully" });
    }
  } catch (err) {
    console.log(err, "delete failed");
    return res
      .status(500)
      .json({ message: "an error occured in admin delete" });
  }
});

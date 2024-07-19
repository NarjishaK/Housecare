const Charity = require("../model/charity");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  const { charity, email, date } = req.body;
  const image = req.file.filename;

  try {
    const charitys = await Charity.findOne({ email });
    if (charitys) {
      return res
        .status(400)
        .json({ invalid: true, message: "email is already exist" });
    }
    const charities = await Charity.create({
      charity: charity,
      email: email,
      date: date,
      image: image,
    });
    if (!charities) {
      console.log("charity creation failed");
      res.send("Failed");
    } else {
      res.send("Success");
    }
  } catch (err) {
    console.log(err, "craetion failed");
    return res
      .status(400)
      .json({ err: "something went wrong in charity creation" });
  }
});

exports.list = asyncHandler(async (req, res) => {
  try {
    const charities = await Charity.find();
    if (!charities) {
      console.log("something went wrong in charity list");
      return res
        .status(400)
        .json({ message: "charity listing failed something went wrong" });
    }
    res.json(charities);
  } catch (err) {
    console.log(err, "charity listing failed");
    return res.status(500).json({ err: "charity listing failed" });
  }
});

exports.edit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const charities = await Charity.findById(id);
    if (!charities) {
      console.log("something went wrong in Edit by Id");
      return res.status(400).json({
        message: "an error occured in edit by Id Can't found the charity",
      });
    }
    res.json(charities);
  } catch (err) {
    console.log(err, "an error occured in edit by Id");
    return res
      .status(500)
      .json({ err: "an error occured in charity details edit by Id" });
  }
});

exports.update = asyncHandler(async (req, res) => {
  const { charity, email, date } = req.body;
  const { id } = req.params;
  try {
    const charities = await Charity.findById(id);
    if (!charities) {
      console.log("charity not found");
      return res.status(400).json({ message: "charity not found to update" });
    }
    charities.email = email;
    charities.charity = charity;
    charities.date = date;
    if (req.file) {
      charities.image = req.file.filename;
    }
    const updatecharity = await charities.save();
    res.json({ updatecharity });
  } catch (err) {
    console.log(err, "an error occured in charity updation");
    return res
      .status(500)
      .json({ message: "an error occured in charity updation " });
  }
});

exports.delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const charities = await Charity.findById(id);
    if (!charities) {
      console.log("charity not found");
      return res.status(400).json({ message: "charity not found to delete" });
    } else {
      await charities.deleteOne();
      res.json({ message: "delete successfully" });
    }
  } catch (err) {
    console.log(err, "delete failed");
    return res
      .status(500)
      .json({ message: "an error occured in charity delete" });
  }
});

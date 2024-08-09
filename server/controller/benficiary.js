const Benificiaries = require("../model/benificiary");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  const {
    benificiary_name,
    category,
    age,
    charity_name,
    email_id,
    number,
    nationality,
    sex,
    health_status,
    marital,
    navision_linked_no,
    physically_challenged,
    family_members,
    account_status,
    Balance,
  } = req.body;

  try {
    const benificiaries = await Benificiaries.findOne({ email_id });
    if (benificiaries) {
      return res
        .status(400)
        .json({ invalid: true, message: "email is already exist" });
    }
    const charities = await Benificiaries.create({
      charity_name: charity_name,
      email_id: email_id,
      benificiary_name: benificiary_name,
      category: category,
      age: age,
      number: number,
      nationality: nationality,
      sex: sex,
      health_status: health_status,
      marital: marital,
      navision_linked_no: navision_linked_no,
      physically_challenged: physically_challenged,
      Balance: Balance,
      account_status: account_status,
      family_members: family_members,
    });
    if (!charities) {
      console.log("benificiary creation failed");
      res.send("Failed");
    } else {
      res.send("Success");
    }
  } catch (err) {
    console.log(err, "benificiary creation failed");
    return res
      .status(400)
      .json({ err: "something went wrong in benificiary creation" });
  }
});

exports.list = asyncHandler(async (req, res) => {
	try {
		const charities = await Benificiaries.find();
		if (!charities) {
			console.log('something went wrong in benificiaries list');
			return res.status(400).json({ message: 'benificiary listing failed something went wrong' });
		}
		res.json(charities);
	} catch (err) {
		console.log(err, 'benificiary listing failed');
		return res.status(500).json({ err: 'benificiary listing failed' });
	}
});


exports.edit = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const charities = await Benificiaries.findById(id);
		if (!charities) {
			console.log('something went wrong in Edit by Id');
			return res.status(400).json({
				message: "an error occured in edit by Id Can't found the benificiary",
			});
		}
		res.json(charities);
	} catch (err) {
		console.log(err, 'an error occured in edit by Id');
		return res.status(500).json({ err: 'an error occured in benificiary details edit by Id' });
	}
});


exports.update = asyncHandler(async (req, res) => {
    const {
        benificiary_name,
        category,
        age,
        charity_name,
        email_id,
        number,
        nationality,
        sex,
        health_status,
        marital,
        navision_linked_no,
        physically_challenged,
        family_members,
        account_status,
        Balance,
      } = req.body;
        const { id } = req.params;
	try {
		const charity = await Benificiaries.findById(id);
		if (!charity) {
			return res.status(400).json({ message: 'benificiary not found' });
		}
		charity.benificiary_name = benificiary_name;
    charity.category = category;
    charity.age = age;
		charity.email_id = email_id;
		charity.number = number;
		charity.marital = marital;
		charity.charity_name = charity_name;
		charity.sex = sex;
		charity.nationality = nationality;
		charity.health_status = health_status;
		charity.navision_linked_no = navision_linked_no;
		charity.account_status = account_status;
		charity.Balance = Balance;
		charity.physically_challenged = physically_challenged;
		charity.family_members = family_members;
		const updateBenificiary = await charity.save();
		res.json({ updateBenificiary });
	} catch (err) {
		console.log('an error occured in Benificiary updation');
		return res.status(500).json({ err: 'An error occured in Benificiary details updation' });
	}
});

exports.delete = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const charities = await Benificiaries.findById(id);
		if (!charities) {
			console.log('Benificiary not found');
			return res.status(400).json({ message: 'Benificiary not found to delete' });
		} else {
			await charities.deleteOne();
			res.json({ message: 'delete successfully' });
		}
	} catch (err) {
		console.log(err, 'delete failed');
		return res.status(500).json({ message: 'an error occured in Benificiary delete' });
	}
});

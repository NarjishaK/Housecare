const Charity = require('../model/charity');
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = asyncHandler(async (req, res) => {
	const { charity, email, date, arbic, CR_NO,roles,password, VAT_REG_NO, authorizedperson, phone } = req.body;
	const image = req.file.filename;

	try {
		const charitys = await Charity.findOne({ email });
		if (charitys) {
			return res.status(400).json({ invalid: true, message: 'email is already exist' });
		}
		const charities = await Charity.create({
			charity: charity,
			email: email,
			password: password,
			date: date,
			authorizedperson: authorizedperson,
			CR_NO: CR_NO,
			roles: roles,
			VAT_REG_NO: VAT_REG_NO,
			phone: phone,
			arbic: arbic,
			image: image,
		});
		if (!charities) {
			console.log('charity creation failed');
			res.send('Failed');
		} else {
			res.send('Success');
		}
	} catch (err) {
		console.log(err, 'craetion failed');
		return res.status(400).json({ err: 'something went wrong in charity creation' });
	}
});

exports.list = asyncHandler(async (req, res) => {
	try {
		const charities = await Charity.find();
		if (!charities) {
			console.log('something went wrong in charity list');
			return res.status(400).json({ message: 'charity listing failed something went wrong' });
		}
		res.json(charities);
	} catch (err) {
		console.log(err, 'charity listing failed');
		return res.status(500).json({ err: 'charity listing failed' });
	}
});

exports.edit = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const charities = await Charity.findById(id);
		if (!charities) {
			console.log('something went wrong in Edit by Id');
			return res.status(400).json({
				message: "an error occured in edit by Id Can't found the charity",
			});
		}
		res.json(charities);
	} catch (err) {
		console.log(err, 'an error occured in edit by Id');
		return res.status(500).json({ err: 'an error occured in charity details edit by Id' });
	}
});

exports.update = asyncHandler(async (req, res) => {
	const { charity, email, password,date, arbic, CR_NO, roles,VAT_REG_NO, authorizedperson, phone } = req.body;
	const { id } = req.params;
	try {
		const charities = await Charity.findById(id);
		if (!charities) {
			console.log('charity not found');
			return res.status(400).json({ message: 'charity not found to update' });
		}
		charities.email = email;
		charities.password = password;
		charities.charity = charity;
		charities.date = date;
		charities.phone = phone;
		charities.VAT_REG_NO = VAT_REG_NO;
		charities.CR_NO = CR_NO;
		charities.roles = roles;
		charities.authorizedperson = authorizedperson;
		charities.arbic = arbic;
		if (req.file) {
			charities.image = req.file.filename;
		}
		const updatecharity = await charities.save();
		res.json({ updatecharity });
	} catch (err) {
		console.log(err, 'an error occured in charity updation');
		return res.status(500).json({ message: 'an error occured in charity updation ' });
	}
});

exports.delete = asyncHandler(async (req, res) => {
	const { id } = req.params;

	try {
		const charities = await Charity.findById(id);
		if (!charities) {
			console.log('charity not found');
			return res.status(400).json({ message: 'charity not found to delete' });
		} else {
			await charities.deleteOne();
			res.json({ message: 'delete successfully' });
		}
	} catch (err) {
		console.log(err, 'delete failed');
		return res.status(500).json({ message: 'an error occured in charity delete' });
	}
});

exports.details = asyncHandler(async (req, res) => {
	const { charity } = req.params;
	try {
    const charities =await Charity.findOne({charity})
    if(!charities){
      return res.status(400).json({message:"charity is not found"})
    }
    res.json(charities)
	} catch (err) {
		console.log('an error occured in ', err);
    return res.status(500).json({err:"An error occured in charity organaization details "})
	}
});

exports.signin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	try {
	  const user = await Charity.findOne({ email });
	  if (!user) {
		console.log('user not found');
		return res.status(400).json({ message: 'user not found' });
	  }
	  const isMatch = await bcrypt.compare(password, user.password);
	  if (!isMatch) {
		console.log('password not matched');  
		return res.status(400).json({ message: 'password not matched' });
	  }
	  if(user && isMatch){
		const charitydetails ={
			charity:user.charity,
			email:user.email,
			image:user.image,
			phone:user.phone,
			id:user._id,
			roles:user.roles,
			VAT_REG_NO:user.VAT_REG_NO,
			authorizedperson:user.authorizedperson,
			date:user.date,
			arbic:user.arbic,
			CR_NO:user.CR_NO,
		}
		  
	  const token = jwt.sign({ email: user.email }, 'myjwtsecretkey');
	  user.tokens = token;
	  await user.save();
	  console.log('login successful, token generated');
	  return res.status(200).json({ token: token, charitydetails:charitydetails });

	  }else{
		return res.status(400).json({ message: 'password not matched' });
	  }
	} catch (err) {
	  console.log(err, 'login failed');
	  return res.status(500).json({ err: 'login failed' });
	}
  });

  exports.detailses = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
	  const charities = await Charity.findById(id); // Find by ID
	  if (!charities) {
		return res.status(400).json({ message: "Charity not found" });
	  }
	  res.json(charities);
	} catch (err) {
	  console.log('An error occurred:', err);
	  return res.status(500).json({ err: "An error occurred while fetching charity details" });
	}
  });
  
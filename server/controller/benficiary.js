const Benificiaries = require("../model/benificiary");
const asyncHandler = require("express-async-handler");
const Debited = require('../model/debited');



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
    const benificiariesphone = await Benificiaries.findOne({ number });
    if (benificiariesphone) {
      return res
        .status(400)
        .json({ invalid: true, message: "phone number is already exist" });
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
    // Check if the email already exists for another staff member
    const existingEmail = await Benificiaries.findOne({ email_id, _id: { $ne: id } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if the phone number already exists for another staff member
    const existingPhone = await Benificiaries.findOne({ number, _id: { $ne: id } });
    if (existingPhone) {
      return res.status(400).json({ message: 'Phone number already exists' });
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

//update balance
exports.updateBeneficiaryBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const { Balance } = req.body;

    const beneficiary = await Benificiaries.findById(id);
    if (!beneficiary) {
      return res.status(404).send("Beneficiary not found");
    }

    beneficiary.Balance = Balance;
    await beneficiary.save();

    res.send(beneficiary);
  } catch (error) {
    res.status(500).send("Error updating beneficiary balance");
  }
};


///

// Create a new debited record
exports. createDebitedRecord = async (req, res) => {
  try {
      const { debitedAmount, debitedDate, transactionId, beneficiary } = req.body;

      const newDebited = new Debited({
          debitedAmount,
          debitedDate,
          transactionId,
          beneficiary
      });

      await newDebited.save();
      res.status(201).json(newDebited);
  } catch (error) {
      console.error('Error creating debited record:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
// Example of a controller update function
exports.updateBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const { debitedAmount, debitedDate, Balance } = req.body;
    
    const updatedBeneficiary = await Benificiaries.findByIdAndUpdate(
      id,
      { debitedAmount, debitedDate, Balance }, // Ensure all necessary fields are updated
      { new: true }
    );

    if (!updatedBeneficiary) {
      return res.status(404).send('Beneficiary not found');
    }

    res.json(updatedBeneficiary);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//balanceupdate splited tobalance
exports.updateBalances = async (req, res) => {
  try {
    const { balanceUpdates } = req.body;

    await Promise.all(balanceUpdates.map(async (update) => {
      const beneficiary = await Benificiaries.findById(update.beneficiaryId);
      if (beneficiary) {
        beneficiary.Balance += update.newBalance;
        await beneficiary.save();
      }
    }));

    res.status(200).json({ message: 'Balances updated successfully' });
  } catch (error) {
    console.error('Error updating balances:', error);
    res.status(500).json({ message: 'Error updating balances' });
  }
};
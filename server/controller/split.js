const Splits = require("../model/split");
const Benificiary = require("../model/benificiary");
const Notifications = require("../model/notification");
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();  // Load environment variables

exports.sendPdf = async (req, res) => {
  try {
    const { filename, path: filePath } = req.file;

    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email with the PDF attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'navaskuniyil6@gmail.com',
      subject: 'PDF Document',
      text: 'Please find the attached PDF document.',
      attachments: [
        {
          filename,
          path: filePath,
        },
      ],
    });

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.status(200).json({ message: 'PDF sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send PDF.' });
  }
};


exports.saveSplits = async (req, res) => {
  try {
    const { splits } = req.body;
    await Splits.insertMany(splits);
    res.status(200).json({ message: "Splits saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save splits" });
  }
};

exports.getSplits = async (req, res) => {
  try {
    const splits = await Splits.find().populate("beneficiary");
    res.status(200).json(splits);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch splits" });
  }
};

// Controller function to delete a split by ID
exports.deleteSplit = async (req, res) => {
    const { id } = req.params;
    
    try {
      const result = await Splits.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Split not found' });
      }
  
      res.status(200).json({ message: 'Split deleted successfully' });
    } catch (error) {
      console.error('Error deleting split:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// upload

exports.updateSplitById = async (req, res) => {
  try {
    const { id } = req.params;
    const { beneficiary, ...splitData } = req.body;

    // Update the Split
    const updatedSplit = await Splits.findByIdAndUpdate(id, splitData, { new: true });
    
    if (!updatedSplit) {
      return res.status(404).send('Split not found');
    }
    
    // Update the Benificiary
    const benfID = await Splits.findById(id).populate("beneficiary");
    const beneficiar = await Benificiary.findById(benfID.beneficiary);
    const updatedBeneficiary = await Benificiary.findByIdAndUpdate(beneficiar._id, beneficiary);

    if (!updatedBeneficiary) {
      return res.status(404).send('Beneficiary not found');
    }

    res.json({
      split: updatedSplit,
      beneficiary: updatedBeneficiary
    });
  } catch (error) {
    console.error("Error updating split and beneficiary:", error);
    res.status(500).send('Server Error');
  }
};

//////////////


// Increment notification count
exports.incrementNotification = async (req, res) => {
  try {
    let notification = await Notifications.findOne();

    if (!notification) {
      notification = new Notifications({ notificationcount: 0 });
    }

    notification.notificationcount += 1;
    await notification.save();

    res.status(200).json({ success: true, count: notification.notificationcount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error incrementing notification count", error });
  }
};

// Get notification count
exports.getNotificationCount = async (req, res) => {
  try {
    const notification = await Notifications.findOne();

    if (!notification) {
      return res.status(200).json({ success: true, count: 0 });
    }

    res.status(200).json({ success: true, count: notification.notificationcount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting notification count", error });
  }
};

// Reset notification count
exports.resetNotificationCount = async (req, res) => {
  try {
    let notification = await Notifications.findOne();

    if (!notification) {
      notification = new Notifications({ notificationcount: 0 });
    }

    notification.notificationcount = 0;
    await notification.save();

    res.status(200).json({ success: true, message: "Notification count reset", count: notification.notificationcount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error resetting notification count", error });
  }
};

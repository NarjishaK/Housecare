const Splits = require("../model/split");

const nodemailer = require('nodemailer');
const fs = require('fs');

exports.sendPdf = async (req, res) => {
  try {
    const { filename, path: filePath } = req.file;

    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'narjishakuniyil@gmail.com',
        pass: 'uizijtixkxgvcvmw',
      },
    });

    // Send email with the PDF attachment
    await transporter.sendMail({
      from: 'narjishakuniyil@gmail.com',
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



  
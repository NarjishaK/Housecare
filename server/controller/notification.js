// const Notifications = require("../model/notification");
// exports.createNotification = async (req, res) => {
//     try {
//       const { charityName } = req.body;
//       const message = `New Message received from ${charityName}`;
  
//       const newNotification = new Notifications({
//         notificationcount: 1,
//         message,
//         charityName,
//       });
  
//       await newNotification.save();
//       res.status(201).json({ success: true, notification: newNotification });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Error creating notification", error });
//     }
//   };
  
//   // Function to get the current notification count and message
//   exports.getNotificationCount = async (req, res) => {
//     try {
//       const notification = await Notifications.findOne().sort({ _id: -1 }).exec();
//       res.status(200).json({ success: true, notification });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Error fetching notifications", error });
//     }
//   };
  
//   // Function to reset the notification count
//   exports.resetNotificationCount = async (req, res) => {
//     try {
//       await Notifications.updateMany({}, { notificationcount: 0 });
//       res.status(200).json({ success: true, message: "Notification count reset successfully" });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Error resetting notification count", error });
//     }
//   };
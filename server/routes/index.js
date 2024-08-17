var express = require('express');
var router = express.Router();
const { saveSplits, getSplits,sendPdf,updateSplitById } = require("../controller/split")
const splitsController = require("../controller/split")
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/api/splits", saveSplits);
router.get("/api/splits", getSplits);
router.delete('/:id', splitsController.deleteSplit);
router.post('/send-pdf', upload.single('pdf'), sendPdf);
router.put('/splits/:id', updateSplitById);
router.post("/increment", splitsController.incrementNotification);
router.get("/count", splitsController.getNotificationCount);
router.post("/reset", splitsController.resetNotificationCount);
router.put('/splits/:id/status', splitsController.updateSplitStatus);
router.get("/pending-approvals",splitsController.getPendingApprovalsCount);

module.exports = router;

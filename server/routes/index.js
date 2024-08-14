var express = require('express');
var router = express.Router();
const { saveSplits, getSplits,sendPdf } = require("../controller/split")
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

module.exports = router;

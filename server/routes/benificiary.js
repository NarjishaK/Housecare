var express = require("express");
const Controller = require("../controller/benficiary");
var router = express.Router();
// const multer = require("multer");
const Authentication = require("../middleware/auth")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// var upload = multer({ storage: storage });

router.post("/", Controller.create);
router.get("/",Controller.list);
router.get("/:id", Controller.edit);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);

module.exports = router;

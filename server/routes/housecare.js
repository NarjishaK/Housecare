var express = require("express");
const Controller = require("../controller/housecare-admin");
var router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post("/", upload.single("image"), Controller.create);
router.post("/signin", Controller.signin);
router.get("/", Controller.list);
router.get("/:id", Controller.edit);
router.put("/:id", upload.single("image"), Controller.update);
router.delete("/:id", Controller.delete);

module.exports = router;

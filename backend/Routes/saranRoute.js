const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter");
const authController = require("../controller/saranController");

router.post("/saran", upload.single("tesimage"), authController.saran);


module.exports = router;

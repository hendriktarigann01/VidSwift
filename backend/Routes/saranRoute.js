const express = require("express");
const router = express.Router();
const authController = require("../controller/saranController");

router.post("/saran", authController.saran);

module.exports = router;

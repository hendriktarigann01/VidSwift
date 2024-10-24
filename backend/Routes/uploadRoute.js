const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMulter");
const uploadController = require("../controller/uploadController");

router.post("/upload", upload.single("tesimage"), uploadController.uploadImage);

module.exports = router;

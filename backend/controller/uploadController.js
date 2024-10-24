const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "tesimage" }, 
      function (error, result) {
        if (error) {
          console.log(error);
          return res.status(401).json({
            success: false,
            message: "Error uploading to Cloudinary",
          });
        }
        res.status(200).json({
          success: true,
          message: "Uploaded successfully",
          data: result,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// // Pastikan export dengan cara ini
// module.exports = { uploadImage };

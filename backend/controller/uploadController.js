const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "tesimage" },
      (error, result) => {
        if (error) {
          console.log(error);
          reject(new Error("Error uploading to Cloudinary"));
        } else {
          resolve(result.secure_url); 
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

module.exports = { uploadImage };

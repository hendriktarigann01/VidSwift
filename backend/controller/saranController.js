const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const nodemailer = require("nodemailer");
const Saran = require("../models/saranModel");

exports.saran = async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;

    if (!nama || !email || !pesan) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save suggestion to the database
    const saranBaru = new Saran({ nama, email, pesan });
    await saranBaru.save();

    // Handle image upload if an image is provided
    let imageUrl = null;
    if (req.file) {
      // Using a promise to wait for the upload result
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "tesimage" },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject("Error uploading to Cloudinary");
            } else {
              resolve(result.url);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    }

    // Send email after saving suggestion and completing image upload
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hendriktarigan52@gmail.com",
        pass: "bhmq qnjx wsxg tpbv",
      },
    });

    const mailOptions = {
      from: email,
      to: "hendriktarigan52@gmail.com",
      subject: "Masukkan atau Saran",
      text: `Nama: ${nama}\nEmail: ${email}\nPesan: ${pesan}\nImage URL: ${
        imageUrl || "No image uploaded"
      }`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully: " + info.response);
      }
    });

    res.status(201).json({
      message: "Suggestion saved and email sent successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error saving suggestion:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


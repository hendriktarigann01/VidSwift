const nodemailer = require("nodemailer");
const Saran = require("../models/saranModel");
const { uploadImage } = require("./uploadController");

exports.saran = async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;
    const imageFile = req.file; // Ambil file gambar dari permintaan

    if (!nama || !email || !pesan) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile); // Panggil fungsi uploadImage
    }

    // Simpan data ke MongoDB termasuk URL gambar
    const saranBaru = new Saran({ nama, email, pesan, imageUrl });
    await saranBaru.save();

    // Mengirim email setelah saran tersimpan
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
      text: `Nama: ${nama}\nEmail: ${email}\nPesan: ${pesan}\nURL Gambar: ${imageUrl}`,
    };

    console.log("Mempersiapkan untuk mengirim email...");
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error saat mengirim email:", error);
      } else {
        console.log("Email berhasil dikirim: " + info.response);
      }
    });

    res.status(201).json({
      message: "Saran berhasil disimpan, gambar terunggah, dan email terkirim",
    });
  } catch (error) {
    console.error("Error saat menyimpan saran:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menyimpan data", error });
  }
};

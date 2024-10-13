const nodemailer = require("nodemailer");
const Saran = require("../models/saranModel");

exports.saran = async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;

    if (!nama || !email || !pesan) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const saranBaru = new Saran({ nama, email, pesan });
    await saranBaru.save();

    // Mengirim email setelah saran tersimpan
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asd",
        pass: "asdasd",
      },
    });

    const mailOptions = {
      from: email,
      to: "asd",
      subject: "Masukkan atau Saran",
      text: `Nama: ${nama}\nEmail: ${email}\nPesan: ${pesan}`,
    };
    console.log("Mempersiapkan untuk mengirim email...");
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error saat mengirim email:", error);
      } else {
        console.log("Email berhasil dikirim: " + info.response);
      }
    });

    res
      .status(201)
      .json({ message: "Saran berhasil disimpan dan email terkirim" });
  } catch (error) {
    console.error("Error saat menyimpan saran:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menyimpan data", error });
  }
};

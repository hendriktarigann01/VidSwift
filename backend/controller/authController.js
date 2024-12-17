require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const EmailTemplate = require("../EmailTemplate.hbs");

// Register
exports.register = async (req, res) => {
  try {
    const { username, fullName, password, email } = req.body;
    if (!username || !fullName || !password || !email) {
      return res
        .status(400)
        .json({ error: "Mohon Lengkapi Data Dengan Benar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      fullName: fullName,
      password: hashedPassword,
      email: email,
    });
    await newUser.save();
    res.status(201).json({ message: "Akun Berhasil di Daftarkan" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: `Error registering user: ${error.message}` });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username/Email and password harus diisi" });
    }

    const isEmail = username.includes("@");

    const user = await User.findOne(
      isEmail ? { email: username } : { username: username }
    );
    if (!user) {
      return res
        .status(400)
        .json({ error: "Username atau email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password Salah" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });

    // Store JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({ message: "Login Berhasil" });
  } catch (error) {
    res.status(500).json({ error: "Ada Gangguan Pada Server" });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal Logout" });
    }
    res.clearCookie("token"); // Clear the JWT token cookie
    res.json({ message: "Logout Berhasil" });
  });
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Jangan tampilkan password
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Forgot Password
const renderTemplate = (templatePath, data) => {
  // Fungsi untuk merender template email menggunakan Handlebars
  const templateFile = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateFile);
  return template(data);
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Email tidak terdaftar" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.token = resetToken;
    user.tokenExpired = Date.now() + 3600000; // Token berlaku 1 jam
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Tentukan path untuk file template
    const templatePath = path.join(__dirname, "../EmailTemplate.hbs");

    // Render template dengan data yang diperlukan
    const emailHtml = renderTemplate(templatePath, { resetToken, email });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(
      `Kirim email ke ${email} dengan tautan: https://vidswift.vercel.app/reset-password/${resetToken}`
    );

    res.json({
      message: "Tautan reset kata sandi telah dikirim ke email Anda",
    });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token dan kata sandi baru diperlukan" });
    }

    const user = await User.findOne({
      token: token,
      tokenExpired: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Token tidak valid atau telah kedaluwarsa" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.token = undefined; // Hapus token
    user.tokenExpired = undefined; // Hapus tanggal kedaluwarsa token
    await user.save();

    res.json({ message: "Kata sandi berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

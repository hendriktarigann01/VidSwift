const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "Username Salah" });
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

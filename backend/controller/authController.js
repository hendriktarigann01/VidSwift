const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Register
exports.register = async (req, res) => {
  try {
    const { username, fullName, password, email } = req.body;
    // Validasi jika username atau password tidak ada
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
    console.error("Error registering user:", error); // Melihat detail error di console
    res.status(500).json({ error: `Error registering user: ${error.message}` }); // Sertakan pesan error
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validasi jika username atau password tidak ada
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.clearCookie("sid");
    res.json({ message: "Logout successful" });
  });
};

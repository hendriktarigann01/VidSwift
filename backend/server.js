const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoutes = require("./Routes/userRoute");
const saranRoutes = require("./Routes/saranRoute");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const PORT = 5000;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

app.use(
  cors({
    origin: ["https://vidswift.vercel.app", "http://localhost:3000"], // Tambahkan localhost untuk testing
    credentials: true, 
  })
);

// Konfigurasi tambahan untuk preflight request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://vidswift.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure hanya jika production
  })
);

// Rute Utama
app.get("/", (req, res) => {
  res.json("Hello GES!");
});

// Rute App
app.use("/api/auth", authRoutes);
app.use("/api", saranRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  connectDb();
});

const mongoose = require("mongoose");
const moment = require("moment-timezone");

// Definisikan schema untuk Saran
const saranSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true },
  pesan: { type: String, required: true },
  tanggal: {
    type: Date,
    default: () => moment().tz("Asia/Jakarta").toDate(),
  },
});

// Buat model berdasarkan schema
const Saran = mongoose.model("Saran", saranSchema);

module.exports = Saran;

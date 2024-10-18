# VidSwift

VidSwift adalah aplikasi pengunduh video yang kuat dirancang dengan antarmuka pengguna yang ramping dan intuitif. Proyek ini dibangun menggunakan arsitektur full-stack, memanfaatkan Node.js dan Express untuk backend, sementara frontend dibuat dengan React dan diberi gaya menggunakan TailwindCSS.

## 🌟 Fitur Utama
- **Antarmuka Ramah Pengguna:** Dibangun dengan React untuk memberikan pengalaman pengguna yang mulus dan responsif.
- **API Backend:** Didukung oleh Node.js dan Express untuk menangani otentikasi, sesi, dan penyimpanan data.
- **Mode Gelap:** Mudah beralih antara mode terang dan gelap untuk pengalaman yang dipersonalisasi.
- **Pengembangan Bersama:** Gunakan `concurrently` untuk menjalankan server frontend dan backend secara bersamaan selama pengembangan.

## 🛠️ Tumpukan Teknologi
**Frontend:**
- React
- TailwindCSS
- React Router
- Styled Components
- Font Awesome Icons

**Backend:**
- Node.js
- Express
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens) untuk otentikasi
- bcrypt untuk hashing kata sandi
- Express-session untuk manajemen sesi
- Nodemailer untuk penanganan email

## ⚙️ Prerequisites
Pastikan Anda memiliki perangkat lunak berikut terinstal sebelum menjalankan proyek ini:
- Node.js (v16.x.x atau lebih baru)
- npm (v7.x.x atau lebih baru)

## 🚀 Memulai
Ikuti langkah-langkah berikut untuk menyiapkan dan menjalankan proyek di mesin lokal Anda:

1. **Clone Repositori:**
   git clone https://github.com/username/VidSwift.git
   cd VidSwift
   
Instal Dependensi: Untuk root, backend, dan frontend:
npm install
cd backend && npm install

Open a new terminal for the frontend installation:
cd frontend && npm install

Menjalankan Aplikasi: Di direktori root proyek, mulai kedua server frontend dan backend secara bersamaan:
npm start
Frontend akan berjalan di http://localhost:3000
Backend akan berjalan di http://localhost:5000

Menjalankan Secara Terpisah: Anda juga dapat menjalankan frontend atau backend secara individu:

Untuk menjalankan backend saja:
npm run backend

Untuk menjalankan frontend saja:
npm run frontend

🔧 Alat yang Digunakan
Concurrently: Untuk mengelola beberapa server secara bersamaan.
dotenv: Untuk manajemen variabel lingkungan.
Nodemailer: Untuk mengirim email dari backend.
🤝 Pedoman Kontribusi
Kontribusi sangat diterima! Ikuti langkah-langkah ini untuk berkontribusi:

Fork repositori.

Buat branch fitur Anda:
git checkout -b <feature-branch>

Komit perubahan Anda:
git commit -m "Add your message"

Push branch:
git push origin <feature-branch>

Buka Pull Request.

📜 Lisensi
Proyek ini dilisensikan di bawah ISC License.


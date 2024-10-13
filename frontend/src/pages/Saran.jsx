import React, { useState } from "react";

const Saran = ({ setLoading }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading

    // Simulasikan loading selama 5 detik
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/saran", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama, email, pesan }),
        });

        if (response.ok) {
          setStatus("Saran berhasil dikirim!");
          setNama("");
          setEmail("");
          setPesan("");
        } else {
          setStatus("Terjadi kesalahan. Coba lagi.");
        }
      } catch (error) {
        setStatus("Terjadi kesalahan pada server.");
      } finally {
        setLoading(false); // Akhiri loading setelah proses selesai
      }
    }, 5000); // 5000 ms = 5 detik
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Kirimkan Saran Anda</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nama" className="block">
            Nama:
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pesan" className="block">
            Pesan:
          </label>
          <textarea
            id="pesan"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            className="w-full p-2 border border-gray-300"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Kirim
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default Saran;

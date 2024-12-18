import React, { useState } from "react";

const Saran = ({ setLoading }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("pesan", pesan);
    if (uploadImage) {
      formData.append("tesimage", uploadImage);
    }

    try {
      const response = await fetch(
        "https://vidswift-api.vercel.app/api/saran",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("Saran berhasil dikirim!");
        setNama("");
        setEmail("");
        setPesan("");
        setUploadImage(null);
      } else {
        setStatus("Terjadi kesalahan. Coba lagi.");
      }
    } catch (error) {
      setStatus("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
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
        <div className="mb-4">
          <label htmlFor="uploadImage" className="block">
            Upload Image:
          </label>
          <input
            type="file"
            name="tesimage"
            id="uploadImage"
            onChange={(e) => setUploadImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300"
          />
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

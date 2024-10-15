import React, { useState } from "react";
import Toast from "../components/Toast";

const RemoveBackground = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGoogleDriveLink, setIsGoogleDriveLink] = useState(false);
  const [toastMessage, setToastMessage] = useState(null); 
  const [toastType, setToastType] = useState(""); 

  const convertGoogleDriveLink = (link) => {
    const fileIdMatch = link.match(/\/d\/(.+?)\//);
    return fileIdMatch
      ? `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
      : link;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setToastMessage(null); // Reset toast sebelum melakukan fetch
    let imageUrlInput = document.getElementById("imageUrlInput").value;

    // Jika input adalah link Google Drive, konversi ke URL langsung
    if (isGoogleDriveLink) {
      imageUrlInput = convertGoogleDriveLink(imageUrlInput);
    }

    const apiUrl = `https://api.ryzendesu.vip/api/ai/removebg?url=${encodeURIComponent(
      imageUrlInput
    )}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          // Jika status tidak OK, lemparkan error
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.blob(); // Ambil gambar sebagai blob jika status OK
      })
      .then((blob) => {
        setLoading(false);
        const imageUrl = URL.createObjectURL(blob); 
        setImageUrl(imageUrl); 
        const formattedResult = `
        <div class="flex justify-center">
          <img src="${imageUrl}" alt="No Background" class="w-32 h-full object-cover" />
        </div>
      `;
        setResult(formattedResult);

        // Tampilkan toast sukses
        setToastMessage("Background dihapus dengan sukses!");
        setToastType("success");
      })
      .catch(() => {
        setLoading(false);
        // Tampilkan toast error
        setToastMessage("Gagal menghapus background.");
        setToastType("error");
      });
  };

  return (
    <div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setToastMessage(null); 
            setToastType("");
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="flex justify-center mt-10">
        <div className="relative w-3/4">
          <label
            htmlFor="imageUrlInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Masukkan URL Gambar untuk Menghapus Background
          </label>
          <div className="flex">
            <input
              type="text"
              id="imageUrlInput"
              name="imageUrlInput"
              placeholder="Masukkan URL gambar"
              className="appearance-none rounded-l border-2 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 border-2 border-gray-200 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
            >
              Hapus
            </button>
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isGoogleDriveLink}
                onChange={() => setIsGoogleDriveLink(!isGoogleDriveLink)}
              />
              <span className="ml-2 text-gray-700">
                Centang jika link dari Google Drive
              </span>
            </label>
          </div>
        </div>
      </form>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <svg
            className="animate-spin h-8 w-8 mr-3 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#60a5fa", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              className="opacity-75"
              fill="url(#grad1)"
              d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2zm16 0a8 8 0 01-8 8v-2a6 6 0 006-6h2z"
            ></path>
          </svg>
          <span className="text-blue-500 text-lg font-medium animate-pulse">
            Menghapus Background...
          </span>
        </div>
      )}

      <div className="mt-4" dangerouslySetInnerHTML={{ __html: result }}></div>

      {imageUrl && (
        <div className="flex justify-center mt-4">
          <a
            href={imageUrl}
            download="no_bg_image.png"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Unduh Gambar
          </a>
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;

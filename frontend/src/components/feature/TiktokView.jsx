import React, { useState } from "react";

const TikTokView = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = document.getElementById("tiktokUrlView").value;
    const apiUrl = `https://mr-apis.com/api/smm/tiktok-view?url=${encodeURIComponent(
      url
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message === "success") {
          setResult(
            "<p class='text-green-500'>TikTok views added successfully!</p>"
          );
        } else if (data.error) {
          setResult(`<p class='text-red-500'>Error: ${data.error}</p>`);
        }
      })
      .catch(() => {
        setLoading(false);
        setResult(
          "<p class='text-red-500'>Failed to process the request. Please try again later.</p>"
        );
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <input
        type="text"
        id="tiktokUrlView"
        name="tiktokUrlView"
        placeholder="Masukkan link video TikTok untuk tambah View"
        className="appearance-none rounded-l border-2 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 border-2 border-gray-200 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
      >
        Add View
      </button>
      {loading && <LoadingSpinner />}
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: result }}></div>
    </form>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center mt-2">
    <svg
      className="animate-spin h-8 w-8 mr-3 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
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
      Processing...
    </span>
  </div>
);

export default TikTokView;
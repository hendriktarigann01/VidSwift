import React, { useState } from "react";
import TikTokLike from "./feature/TiktokLike";
import TikTokView from "./feature/TiktokView";
import TikTokFollowers from "./feature/TiktokFollowers";

const TikTokFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null); // State untuk menyimpan fitur yang dipilih

  const handleButtonClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4">TikTok</h2>
      <p className="mb-2">Tambah Like, View, atau Followers di TikTok</p>

      {/* Tombol untuk menambah Like, View, dan Followers */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg"
          onClick={() => handleButtonClick("like")}
        >
          Tambah Like
        </button>
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg"
          onClick={() => handleButtonClick("view")}
        >
          Tambah View
        </button>
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg"
          onClick={() => handleButtonClick("followers")}
        >
          Tambah Followers
        </button>
      </div>

      {/* Render input sesuai fitur yang dipilih */}
      {selectedFeature === "like" && <TikTokLike />}
      {selectedFeature === "view" && <TikTokView />}
      {selectedFeature === "followers" && <TikTokFollowers />}
    </div>
  );
};

export default TikTokFeatures;

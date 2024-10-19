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
      <h2 className="text-lg sm:text-xl font-bold mb-4">Pilih Salah Satu</h2>

      {/* Tombol untuk menambah Like, View, dan Followers */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        <button
          className="w-32 px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg"
          onClick={() => handleButtonClick("like")}
        >
          Add Like
        </button>
        <button
          className="w-32 px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg"
          onClick={() => handleButtonClick("view")}
        >
          Add View
        </button>
        <button
          className="w-32 px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg"
          onClick={() => handleButtonClick("followers")}
        >
          Add Followers
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

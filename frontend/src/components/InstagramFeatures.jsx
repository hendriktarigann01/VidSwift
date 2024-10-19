import React, { useState } from "react";
import InstagramFollowers from "./feature/InstagramFollowers";
import InstagramLike from "./feature/InstagramLike";

const InstagramFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null); // State untuk menyimpan fitur yang dipilih

  const handleButtonClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4">Instagram</h2>
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        <button
          className="w-32 px-4 py-2 bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-lg"
          onClick={() => handleButtonClick("like")}
        >
          Add Like
        </button>
        <button
          className="w-32 px-4 py-2 bg-white border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-lg"
          onClick={() => handleButtonClick("followers")}
        >
          Add Followers
        </button>
      </div>
      {selectedFeature === "like" && <InstagramLike />}
      {selectedFeature === "followers" && <InstagramFollowers />}
    </div>
  );
};

export default InstagramFeatures;

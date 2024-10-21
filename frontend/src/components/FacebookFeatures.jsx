import React, { useState } from "react";
import FacebookFollowers from "./feature/FacebookFollowers";
import FacebookLike from "./feature/FacebookLike";

const FacebookFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null); 

  const handleButtonClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4">Facebook</h2>
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        <button
          className={`w-32 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg ${
            selectedFeature === "like" ? "bg-blue-400 text-white" : ""
          }`}
          onClick={() => handleButtonClick("like")}
        >
          Add Like
        </button>
        <button
          className={`w-32 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg ${
            selectedFeature === "followers" ? "bg-blue-400 text-white" : ""
          }`}
          onClick={() => handleButtonClick("followers")}
        >
          Add Followers
        </button>
      </div>
      {selectedFeature === "like" && <FacebookLike />}
      {selectedFeature === "followers" && <FacebookFollowers />}
    </div>
  );
};

export default FacebookFeatures;

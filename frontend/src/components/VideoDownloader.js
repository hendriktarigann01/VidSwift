import React, { useState } from "react";
import YouTubeDownloader from "./YouTubeDownloader";
import FacebookDownloader from "./FacebookDownloader";
import InstagramDownloader from "./InstagramDownloader";
import TikTokDownloader from "./TiktokDownloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  faYoutube,
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import wpImage from "../assets/wpImage.png";

const VideoDownloader = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [darkMode] = useState(false);

  const renderDownloader = () => {
    switch (selectedPlatform) {
      case "youtube":
        return <YouTubeDownloader />;
      case "facebook":
        return <FacebookDownloader />;
      case "instagram":
        return <InstagramDownloader />;
      case "tiktok":
        return <TikTokDownloader />;
      default:
        return null;
    }
  };

  const handleBackgroundClick = (e) => {
    if (!e.target.closest(".downloader") && !e.target.closest("button")) {
      setSelectedPlatform("");
    }
  };

  return (
    <div
      className={`mt-28 text-center justify-center m-auto ${
        darkMode ? "darkmode" : ""
      }`}
      onClick={handleBackgroundClick}
    >
      <img
        src={wpImage}
        alt="WP"
        className="flex m-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto pb-10 pt-10 animate-float"
      />

      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        <button
          onClick={() => setSelectedPlatform("youtube")}
          className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium border rounded-lg focus:outline-none ${
            selectedPlatform === "youtube"
              ? "bg-red-500 text-white border-white"
              : "bg-white text-gray-900 border-gray-200"
          } hover:bg-red-700 hover:text-white focus:ring-2 focus:ring-red-500 ${
            darkMode
              ? "dark:bg-gray-700 dark:text-white dark:border-gray-600"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faYoutube} />
          &nbsp; YouTube
        </button>

        <button
          onClick={() => setSelectedPlatform("facebook")}
          className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium border rounded-lg focus:outline-none ${
            selectedPlatform === "facebook"
              ? "bg-blue-600 text-white border-white"
              : "bg-white text-gray-900 border-gray-200"
          } hover:bg-blue-800 hover:text-white focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? "dark:bg-gray-700 dark:text-white dark:border-gray-600"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faFacebook} />
          &nbsp; Facebook
        </button>

        <button
          onClick={() => setSelectedPlatform("instagram")}
          className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium border rounded-lg focus:outline-none ${
            selectedPlatform === "instagram"
              ? "bg-pink-500 text-white border-white"
              : "bg-white text-gray-900 border-gray-200"
          } hover:bg-pink-700 hover:text-white focus:ring-2 focus:ring-pink-500 ${
            darkMode
              ? "dark:bg-gray-700 dark:text-white dark:border-gray-600"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faInstagram} />
          &nbsp; Instagram
        </button>

        <button
          onClick={() => setSelectedPlatform("tiktok")}
          className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium border rounded-lg focus:outline-none ${
            selectedPlatform === "tiktok"
              ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-white"
              : "bg-white text-gray-900 border-gray-200"
          } hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:text-white focus:ring-2 focus:ring-purple-500 ${
            darkMode
              ? "dark:bg-gray-700 dark:text-white dark:border-gray-600"
              : ""
          }`}
        >
          <FontAwesomeIcon icon={faTiktok} />
          &nbsp; TikTok
        </button>
      </div>

      {!selectedPlatform && (
        <div className="flex sm:flex-row items-center justify-center mt-10">
          <FontAwesomeIcon
            icon={faArrowUp}
            bounce
            className="text-red-500 text-2xl sm:text-3xl dark:text-white border-red-500"
          />
          <h1 className="text-lg sm:text-2xl font-bold ml-2 mr-2 dark:text-white">
            Pilih Platform
          </h1>
          <FontAwesomeIcon
            icon={faArrowUp}
            bounce
            className="text-red-500 text-2xl sm:text-3xl dark:text-white border-red-500"
          />
        </div>
      )}

      <div className="downloader">{renderDownloader()}</div>
    </div>
  );
};

export default VideoDownloader;

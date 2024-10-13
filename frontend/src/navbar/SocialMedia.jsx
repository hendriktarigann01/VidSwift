import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import wpSocialMedia from "../assets/wpSocialMedia.png";

const SocialMedia = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [darkMode] = useState(false);

  const renderSocialMediaFeatures = () => {
    switch (selectedPlatform) {
      case "facebook":
        return (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4">Facebook</h2>
            <p className="mb-2">
              Tambah Like, View, atau Followers di Facebook
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-2">
              Tambah Like
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-2">
              Tambah View
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Tambah Followers
            </button>
          </div>
        );
      case "instagram":
        return (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4">Instagram</h2>
            <p className="mb-2">
              Tambah Like, View, atau Followers di Instagram
            </p>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg mb-2">
              Tambah Like
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg mb-2">
              Tambah View
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">
              Tambah Followers
            </button>
          </div>
        );
      case "tiktok":
        return (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4">TikTok</h2>
            <p className="mb-2">Tambah Like, View, atau Followers di TikTok</p>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg mb-2">
              Tambah Like
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg mb-2">
              Tambah View
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg">
              Tambah Followers
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleBackgroundClick = (e) => {
    if (!e.target.closest(".socialmedia") && !e.target.closest("button")) {
      setSelectedPlatform("");
    }
  };

  return (
    <div
      className={`text-center justify-center m-auto ${
        darkMode ? "darkmode" : ""
      }`}
      onClick={handleBackgroundClick}
    >
      <img
        src={wpSocialMedia}
        alt="WP"
        className="flex m-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto animate-float"
      />

      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
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

      <div className="socialmedia">{renderSocialMediaFeatures()}</div>
    </div>
  );
};

export default SocialMedia;

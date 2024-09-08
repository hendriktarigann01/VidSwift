import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

const Switcher6 = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Ambil nilai dari localStorage saat komponen pertama kali dirender
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  const handleCheckboxChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Simpan status dark mode ke localStorage
    localStorage.setItem("darkMode", isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div className="block h-8 w-14 rounded-full bg-[#E5E7EB] dark:bg-[#4B5563]"></div>
          <div
            className="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-800 transition-transform duration-300 transform-gpu"
            style={{
              transform: isDarkMode ? "translateX(100%)" : "translateX(0)",
            }}
          >
            <span
              className={`text-gray-600 ${isDarkMode ? "hidden" : "block"}`}
            >
              <FontAwesomeIcon icon={faSun} />
            </span>
            <span className={`text-white ${isDarkMode ? "block" : "hidden"}`}>
              {" "}
              <FontAwesomeIcon icon={faMoon} />
            </span>
          </div>
        </div>
      </label>
    </>
  );
};

export default Switcher6;

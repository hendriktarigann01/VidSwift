// src/components/Header.js
import React, { useState, useEffect } from "react";
import Switcher6 from "../components/Toogler";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/VidSwiftBlack.svg";
import "../styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Modal from "../components/Modal";

const Header = ({ setLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage or session
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        // Send request to the backend to log out
        const response = await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          credentials: "include", // To include the session cookie in the request
        });

        if (response.ok) {
          // Clear the login status on the frontend
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          navigate("/"); // Navigate to homepage or another route after logout
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("An error occurred during logout:", error);
      } finally {
        setLoading(false);
      }
    }, 5000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-500 backdrop-blur-md px-4 lg:px-6 py-4 dark:bg-gray-800">
      <nav>
        <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          {/* Logo Section */}
          <a href="https://flowbite.com" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          </a>

          {/* Right Section: Switcher & Buttons */}
          <div className="flex items-center lg:order-2">
            <Switcher6 />
            <button
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm border-2 border-transparent text-white rounded-lg lg:hidden hover:border-slate-300 dark:text-gray-400 dark:hover:border-gray-700"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden lg:block items-center font-medium ml-5 text-white hover:scale-105 hover:shadow-md bg-gradient-to-r from-primary-700 to-primary-800 lg:bg-transparent lg:text-primary-700 dark:text-gray-400 dark:hover:text-slate-200 border border-gray-200 rounded px-2 py-1"
              >
                Logout
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <div
            className={`${
              isMenuOpen ? "block items-center" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1 justify-center`}
            id="mobile-menu"
          >
            <ul className="flex flex-row flex-nowrap whitespace-nowrap gap-5 font-medium lg:mt-0">
              <li className="block items-center sm:justify-center sm:flex">
                <a
                  href="/dashboard"
                  className="block items-center py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Download
                </a>
              </li>
              <li className="block items-center sm:justify-center sm:flex">
                <a
                  href="/tutorial"
                  className="block items-center py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Tutorial
                </a>
              </li>
              <li className="block items-center sm:justify-center sm:flex">
                <Link
                  to={isLoggedIn ? "/generate-image" : "#"}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      alert("You must be logged in to access Generate Image.");
                    }
                  }}
                  className="block items-center py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Generate Image
                </Link>
              </li>
              <li className="block items-center sm:justify-center sm:flex">
                <Link
                  to={isLoggedIn ? "/social-media" : "#"}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      alert("You must be logged in to access Social Media.");
                    }
                  }}
                  className="block items-center py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Social Media <FontAwesomeIcon icon={faSquarePlus} />
                </Link>
              </li>
              <li className="block items-center sm:justify-center sm:flex">
                <Link
                  to={isLoggedIn ? "/remove-bg" : "#"}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      alert(
                        "You must be logged in to access Remove Background."
                      );
                    }
                  }}
                  className="block items-center py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Remove Background
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="block items-center sm:justify-center sm:flex">
                    <Link
                      to="/SignIn"
                      className="block font-medium py-2 pr-4 pl-3 text-white hover:scale-105 bg-gradient-to-r from-primary-700 to-primary-800 lg:bg-transparent lg:text-primary-700 dark:text-gray-400 dark:hover:text-slate-200 lg:border lg:border-gray-200 rounded"
                      aria-current="page"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li className="block items-center sm:justify-center sm:flex">
                    <Link
                      to="/SignUp"
                      className="block font-medium py-2 pr-4 pl-3 text-white hover:scale-105 bg-gradient-to-r from-primary-700 to-primary-800 lg:bg-transparent lg:text-primary-700 dark:text-gray-400 dark:hover:text-slate-200 lg:border lg:border-gray-200 rounded"
                      aria-current="page"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
};

export default Header;

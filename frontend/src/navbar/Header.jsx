import React, { useState, useEffect } from "react";
import Switcher6 from "../components/Toogler";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/VidSwiftBlack.svg";
import "../styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage or session
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  const handleLogout = async () => {
    try {
      // Send request to the backend to log out
      const response = await fetch("/api/logout", {
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
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="bg-blue-500 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="relative flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          </a>
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

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="font-medium block ml-5 text-white hover:scale-105 hover:shadow-md bg-gradient-to-r from-primary-700 to-primary-800 lg:bg-transparent lg:text-primary-700 dark:text-gray-400 dark:hover:text-slate-200 border border-gray-200 rounded px-2 py-1"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/SignIn"
                  className="font-medium block ml-5 text-white hover:scale-105 hover:shadow-md bg-gradient-to-r from-primary-700 to-primary-800 lg:bg-transparent lg:text-primary-700 dark:text-gray-400 dark:hover:text-slate-200 border border-gray-200 rounded px-2 py-1"
                  aria-current="page"
                >
                  Sign In
                </Link>
                <Link
                  to="/SignUp"
                  className="font-medium block ml-5 text-white hover:scale-105 hover:shadow-md bg-gradient-to-r from-primary-700 to-primary-800 lg:bg-transparent lg:text-primary-700 dark:text-gray-400 dark:hover:text-slate-200 border border-gray-200 rounded px-2 py-1"
                  aria-current="page"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Flexbox for navigation menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-1 justify-center mx-auto`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="/tutorial"
                  className="block py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Tutorial
                </a>
              </li>
              <li>
                <Link
                  to="/generate-image"
                  className="block py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Generate Image
                </Link>
              </li>
              <li>
                <Link
                  to={isLoggedIn ? "/social-media" : "#"}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      alert("You must be logged in to access Social Media.");
                    }
                  }}
                  className="block py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Social Media <FontAwesomeIcon icon={faSquarePlus} />
                </Link>
              </li>
              <li>
                <Link
                  to="/remove-bg"
                  className="block py-2 pr-4 pl-3 text-white hover:text-blue-950 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-400 dark:hover:text-slate-200"
                  aria-current="page"
                >
                  Remove Background
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import Switcher6 from "../components/Toogler";
import { Link } from "react-router-dom";
import logo from "../assets/VidSwiftBlack.svg";
import "../styles/styles.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          </div>

          {/* Flexbox untuk menu nav */}
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
                  Dashboard
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

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-500 rounded-lg shadow m-2 py-2.5 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap mx-auto justify-center mb-3 text-sm font-medium text-white dark:text-gray-400  sm:mx-0 sm:mt-0 order-1 md:order-1">
          <li>
            <Link to="/about" className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline me-4 md:me-6">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/saran" className="hover:underline">
              Saran
            </Link>
          </li>
        </ul>
        <span className="text-sm text-white sm:text-center dark:text-gray-400 order-2 md:order-2 mt-3 md:mt-0">
          © 2024 <a className="cursor-auto">VidSwift</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

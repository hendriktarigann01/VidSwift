import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 dark:bg-gray-600">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6 dark:bg-[#566e8c]">
        <h1 className="text-2xl font-bold mb-4 text-gray-600 dark:text-slate-200">
          Contact Us
        </h1>
        <p className="text-justify text-gray-500 mb-4 dark:text-slate-300">
          Feel free to reach out to us through any of the platforms below:
        </p>
        <ul className="space-y-4">
          <li className="flex items-center">
            <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 text-gray-500 dark:text-slate-300" />
            <a
              href="https://wa.me/6289637719519"
              className="text-gray-500 hover:text-blue-500 ml-2 dark:text-slate-300 dark:hover:underline"
            >
              WhatsApp
            </a>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faInstagram} className="h-5 w-5 text-gray-500 dark:text-slate-300" />
            <a
              href="https://www.instagram.com/h.tarigannn_/"
              className="text-gray-500 hover:text-blue-500 ml-2 dark:text-slate-300 dark:hover:underline"
            >
              Instagram
            </a>
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faDiscord} className="h-5 w-5 text-gray-500 dark:text-slate-300" />
            <a
              href="https://discordapp.com/users/418539374188167190"
              className="text-gray-500 hover:text-blue-500 ml-2 dark:text-slate-300 dark:hover:underline"
            >
              Discord
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;

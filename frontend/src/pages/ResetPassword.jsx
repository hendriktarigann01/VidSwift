import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Toast from "../components/Toast";
import ResetPasswordImage from "../assets/resetPasswordImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = ({ setLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          "https://vidswift-api.vercel.app/auth/resetPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ ...formData, token }), // Tambahkan token ke body
          }
        );

        const data = await response.json();
        if (response.ok) {
          setToastMessage(data.message);
          setToastType("success");

          setTimeout(() => {
            navigate("/SignIn");
          }, 3000);
        } else {
          setToastMessage(data.error);
          setToastType("error");
        }
      } finally {
        setLoading(false);
      }
    }, 5000);
  };

  return (
    <div className="flex flex-wrap">
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setToastMessage(null);
            setToastType("");
          }}
        />
      )}

      {/* Left Section */}
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <a
            href="#"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900 dark:text-gray-400 dark:border-b-gray-500"
          >
            VidSwift .
          </a>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-left text-3xl font-medium dark:text-gray-400">
            Reset Password
          </p>

          {/* Form */}
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden border-b-2 border-gray-300 dark:border-gray-500 transition focus-within:border-b-gray-500 dark:focus-within:border-b-gray-700">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full flex-1 appearance-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-transparent dark:text-gray-300"
                  placeholder="Masukkan Password Baru"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-2"
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide password">
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-xs text-gray-300 hover:text-gray-500"
                      />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show password">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-xs text-gray-300 hover:text-gray-500"
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="mb-12 relative flex overflow-hidden border-b-2 border-gray-300 dark:border-gray-500 transition focus-within:border-b-gray-500 dark:focus-within:border-b-gray-700">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  className="w-full flex-1 appearance-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-transparent dark:text-gray-300"
                  placeholder="Konfirmasi Password Baru"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-4 top-2"
                >
                  {showNewPassword ? (
                    <span role="img" aria-label="Hide password">
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-xs text-gray-300 hover:text-gray-500"
                      />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show password">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-xs text-gray-300 hover:text-gray-500"
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 dark:shadow-none dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-0"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-gray-500 md:block md:w-1/2">
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src={ResetPasswordImage}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default ResetPassword;

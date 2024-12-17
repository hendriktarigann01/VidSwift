import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ForgotPasswordImage from "../assets/forgotPasswordImage.png";

const ForgotPassword = ({ setLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          "https://vidswift-b5yy085si-hendriks-projects-80014419.vercel.app/api/auth/forgotPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (response.ok) {
          setToastMessage(data.message);
          setToastType("success");
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
            Forgot Password
          </p>

          {/* Form */}
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="mb-12 relative flex overflow-hidden border-b-2 border-gray-300 dark:border-gray-500 transition focus-within:border-b-gray-500 dark:focus-within:border-b-gray-700">
                <input
                  type="text"
                  name="email"
                  className="w-full flex-1 appearance-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-transparent dark:text-gray-300"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
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
          src={ForgotPasswordImage}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;

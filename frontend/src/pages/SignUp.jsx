import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import signUpImage from "../assets/signUpImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = ({ setLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInClick = () => {
    navigate("/SignIn");
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputPassword = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
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
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            VidSwift .
          </a>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-left text-3xl font-medium">Sign Up</p>

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="email"
                  name="email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputPassword}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-2"
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide password">
                      <FontAwesomeIcon icon={faEyeSlash} />
                    </span>
                  ) : (
                    <span role="img" aria-label="Show password">
                      <FontAwesomeIcon icon={faEye} />
                    </span> // Ikon mata terbuka
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="text"
                  name="username"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="text"
                  name="fullName"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              Sign Up
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              Already have an account?{" "}
              <span
                onClick={handleSignInClick}
                className="underline-offset-4 font-semibold text-gray-900 underline cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-gray-500 md:block md:w-1/2">
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src={signUpImage}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default SignUp;

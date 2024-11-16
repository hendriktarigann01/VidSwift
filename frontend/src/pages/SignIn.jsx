import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import loginImage from "../assets/loginImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = ({ setLoading, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          setToastMessage(data.message);
          setToastType("success");
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);

          setTimeout(() => {
            navigate("/dashboard");
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
            Sign In
          </p>

          {/* Form */}
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden border-b-2 border-gray-300 dark:border-gray-500 transition focus-within:border-b-gray-500 dark:focus-within:border-b-gray-700">
                <input
                  type="text"
                  name="username"
                  className="w-full flex-1 appearance-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-transparent dark:text-gray-300"
                  placeholder="Username Or Email"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <div className="relative flex overflow-hidden border-b-2 border-gray-300 dark:border-gray-500 transition focus-within:border-b-gray-500 dark:focus-within:border-b-gray-700">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full flex-1 appearance-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-transparent dark:text-gray-300"
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
              Log in
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={handleSignUpClick}
                className="underline-offset-4 font-semibold text-gray-900 underline cursor-pointer dark:text-gray-300 hover:text-blue-500"
              >
                Sign up for free.
              </span>
            </p>
          </div>
          <a
            href="/forgot-password"
            className="font-semibold text-gray-900 cursor-pointer dark:text-gray-300 hover:underline-offset-4 hover:underline hover:text-blue-500"
            aria-current="page"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-gray-500 md:block md:w-1/2">
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src={loginImage}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default SignIn;

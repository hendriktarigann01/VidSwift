import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const SignIn = ({ setLoading, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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
          }, 2000);
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
    <div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setToastMessage(null); // Menutup toast
            setToastType(""); // Menghapus tipe setelah toast ditutup
          }}
        />
      )}
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-10 md:py-20">
          {/* Component */}
          <div className="relative mx-auto max-w-xl bg-gray-100 px-8 py-12 text-center">
            {/* Close Button */}
            <svg
              className="absolute top-3 right-3 sm:top-7 sm:right-7 cursor-pointer"
              onClick={() => navigate("/dashboard")}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 5.25L18.75 18.75"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.25 18.75L18.75 5.25"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Form */}
            <div className="mx-auto w-full max-w-md">
              <div className="mx-auto mb-4 max-w-md pb-4">
                <form onSubmit={handleSubmit}>
                  <div className="relative flex flex-col">
                    <div className="font-bold mb-1 text-left">Username</div>
                    <input
                      type="text"
                      name="username"
                      className="mb-6 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="font-bold mb-1 text-left">Password</div>
                    <input
                      type="password"
                      name="password"
                      className="block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black"
                      placeholder="Password (min 8 characters)"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <input
                    type="submit"
                    value="Sign In"
                    className="inline-block w-full cursor-pointer items-center rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
                  />
                </form>

                {error && <p className="mt-4 text-red-600">{error}</p>}
                {success && <p className="mt-4 text-green-600">{success}</p>}

                <p className="mt-6">
                  Don't have an account?{" "}
                  <span
                    onClick={handleSignUpClick}
                    className="font-bold underline cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;

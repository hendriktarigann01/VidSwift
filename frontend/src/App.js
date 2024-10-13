import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet";
import Header from "./navbar/Header";
import GenerateImage from "./navbar/GenerateImage";
import RemoveBackground from "./navbar/RemoveBg";
import SocialMedia from "./navbar/SocialMedia";
import Tutorial from "./pages/Tutorial";
import VideoDownloader from "./components/VideoDownloader";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./navbar/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Saran from "./pages/Saran";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/SignIn" || location.pathname === "/SignUp";

  return (
    <div className={`App min-h-screen flex flex-col dark:bg-gray-600`}>
      <Helmet>
        <title>VidSwift</title>
      </Helmet>
      {!isAuthPage && <Header />}
      <div className={`flex-grow ${loading ? "blur-sm" : ""}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<VideoDownloader />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/generate-image" element={<GenerateImage />} />
          <Route path="/remove-bg" element={<RemoveBackground />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/saran"
            element={<Saran setLoading={setLoading} loading={loading} />}
          />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import "./App.css";
import { Helmet } from "react-helmet";
import Header from "./navbar/Header";
import GenerateImage from "./navbar/GenerateImage";
import RemoveBackground from "./navbar/RemoveBg";
import Tutorial from "./pages/Tutorial";
import VideoDownloader from "./components/VideoDownloader";
import Footer from "./navbar/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App min-h-screen flex flex-col dark:bg-gray-600">
      <Helmet>
        <title>VidSwift</title>
      </Helmet>
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />{" "}
          {/* Redirect root to /dashboard */}
          <Route path="/dashboard" element={<VideoDownloader />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/generate-image" element={<GenerateImage />} />
          <Route path="/remove-bg" element={<RemoveBackground />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

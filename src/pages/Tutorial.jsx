import React, { useState } from "react";

const Tutorial = () => {
  const [darkMode] = useState(false);

  const handleBackgroundClick = (e) => {
    if (!e.target.closest(".downloader") && !e.target.closest("button")) {
    }
  };
  return (
    <div
      className={`min-h-screen p-8 ${darkMode ? "darkmode" : ""}`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`max-w-full mx-auto shadow-lg rounded-lg p-10 ${
          darkMode ? "darkmode" : ""
        }`}
        onClick={handleBackgroundClick}
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Tutorial Download Video VidSwift
        </h1>

        {/* Section 1: Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Step 1: Find a Video URL
          </h2>
          <p className="text-gray-700 mb-4">
            To start downloading a video, you need to find the video URL. You
            can get this URL by copying the video link from platforms such as
            YouTube, Vimeo, or other video hosting sites.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Find a Video URL"
            className="rounded-lg shadow-md mb-4 m-auto"
          />
        </section>

        {/* Section 2: Paste the URL */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Step 2: Paste the URL into the Downloader
          </h2>
          <p className="text-gray-700 mb-4">
            After copying the URL, paste it into the input field of the video
            downloader tool. Make sure the URL is correct before proceeding.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Paste URL"
            className="rounded-lg shadow-md mb-4 m-auto"
          />
        </section>

        {/* Section 3: Start the Download */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Step 3: Start the Download
          </h2>
          <p className="text-gray-700 mb-4">
            Once the URL is pasted, simply click the "Download" button. The tool
            will process the video and start downloading it to your device.
          </p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Start Download"
            className="rounded-lg shadow-md mb-4 m-auto"
          />
        </section>

        {/* Section 4: Use Prompts for Downloads */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Step 4: Use Prompts Effectively
          </h2>
          <p className="text-gray-700 mb-4">
            When using prompts, be specific and clear to get the desired
            results. Here’s an example of how to effectively prompt for a video
            download:
          </p>
          <pre className="bg-gray-200 p-4 rounded-lg text-gray-800 mb-4">
            {`Prompt: Download the YouTube video titled "React Tutorial for Beginners".`}
          </pre>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Prompt Example"
            className="rounded-lg shadow-md mb-4 m-auto"
          />
        </section>
      </div>
    </div>
  );
};

export default Tutorial;

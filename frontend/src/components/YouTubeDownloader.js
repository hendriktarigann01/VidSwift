// src/components/YouTubeDownloader.js
import React, { useState } from "react";

const YouTubeDownloader = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = document.getElementById("youtubeUrl").value;
    const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(
      url
    )}`;
    const backupApiUrl = `https://apidl.asepharyana.my.id/api/downloader/ytdl?url=${encodeURIComponent(
      url
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data && data.result && data.resultUrl) {
          const { title, duration, author } = data.result;
          const videoOptions = data.resultUrl.video;
          const audioOptions = data.resultUrl.audio;

          const formattedResult = `
            <div class="flex justify-center">
              <div class="w-full max-w-3xl">
                <h2 class="text-xl font-bold mb-4">${title}</h2>
                <p class="text-gray-600">Duration: ${duration}</p>
                <p class="text-gray-600">Author: ${author}</p>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Format</th>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Quality</th>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Size</th>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Download Link</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      ${videoOptions
                        .map(
                          (video, index) => `
                        <tr key=${index}>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Video</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">${video.format}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">${video.quality}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">${video.size}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                            <a href="${video.download}" target="_blank" rel="noopener noreferrer">Download Video</a>
                          </td>
                        </tr>
                      `
                        )
                        .join("")}
                      ${audioOptions
                        .map(
                          (audio, index) => `
                        <tr key=${index}>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Audio</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">${audio.format}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">${audio.quality}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">${audio.size}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                            <a href="${audio.download}" target="_blank" rel="noopener noreferrer">Download Audio</a>
                          </td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `;
          setResult(formattedResult);
        } else {
          setResult(
            '<p class="text-red-500">Failed to retrieve video information. Please check the URL.</p>'
          );
        }
      })
      .catch(() => {
        setLoading(false);
        setResult(
          '<p class="text-red-500">Failed to download video. Please try again later.</p>'
        );
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center mt-10">
        <div className="relative w-3/4">
          <label
            htmlFor="youtubeUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            YouTube Video URL
          </label>
          <div className="flex">
            <input
              type="text"
              id="youtubeUrl"
              name="youtubeUrl"
              placeholder="Enter YouTube video link"
              className="appearance-none rounded-l border-2 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 border-2 border-gray-200 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <svg
            className="animate-spin h-8 w-8 mr-3 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#60a5fa", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              className="opacity-75"
              fill="url(#grad1)"
              d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2zm16 0a8 8 0 01-8 8v-2a6 6 0 006-6h2z"
            ></path>
          </svg>
          <span className="text-blue-500 text-lg font-medium animate-pulse">
            Processing...
          </span>
        </div>
      )}
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
};

export default YouTubeDownloader;

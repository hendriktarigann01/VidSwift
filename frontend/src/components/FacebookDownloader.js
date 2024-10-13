// src/components/FacebookDownloader.js
import React, { useState } from "react";

const FacebookDownloader = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = document.getElementById("facebookUrl").value;
    const apiUrl = `https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(
      url
    )}`;
    const backupApiUrl = `https://apidl.asepharyana.my.id/api/downloader/fbdl?url=${encodeURIComponent(
      url
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data.status && data.data) {
          // Assuming the first video is 720p and the second one is 360p
          const video720p = data.data.find((video) =>
            video.resolution.includes("720p")
          );
          const video360p = data.data.find((video) =>
            video.resolution.includes("360p")
          );

          const formattedResult = `
            <div class="flex justify-center mt-6">
              <div class="w-full max-w-3xl">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Detail</th>
                        <th class="px-6 py-3 text-center text-lg font-medium text-gray-900 uppercase tracking-wider">Information</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Thumbnail</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <img src="${
                            video720p?.thumbnail
                          }" alt="Thumbnail" class="w-32 h-32 object-cover mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Download</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href="${
                            video720p?.url
                          }" class="text-blue-500 hover:underline" download>Download 720p</a>
                          ${
                            video360p
                              ? ` | <a href="${video360p.url}" class="text-blue-500 hover:underline" download>Download 360p</a>`
                              : ""
                          }
                        </td>
                      </tr>
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
            htmlFor="facebookUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Facebook Video URL
          </label>
          <div className="flex">
            <input
              type="text"
              id="facebookUrl"
              name="facebookUrl"
              placeholder="Enter Facebook video link"
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

export default FacebookDownloader;

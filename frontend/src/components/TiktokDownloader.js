// src/components/TikTokDownloader.js
import React, { useState } from "react";

const TikTokDownloader = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = document.getElementById("tiktokUrl").value;
    const apiUrl = `https://api.ryzendesu.vip/api/downloader/ttdl?url=${encodeURIComponent(
      url
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data && data.data && data.data.data) {
          const {
            title,
            cover,
            duration,
            hdplay,
            music_info,
            play_count,
            digg_count,
            comment_count,
            share_count,
            author,
          } = data.data.data;

          const formattedResult = `
          <div class="flex justify-center">
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
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Title</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${title}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Cover Image</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">
                        <img src="${cover}" alt="Cover" class="w-32 h-32 object-cover mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Duration</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${duration} seconds</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">HD Video</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">
                        <a href="${hdplay}" class="text-blue-500 hover:underline" target="_blank">Download Video</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Music</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">
                        <a href="${music_info.play}" class="text-blue-500 hover:underline" target="_blank">${music_info.title}</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Play Count</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${play_count}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Likes</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${digg_count}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Comments</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${comment_count}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Shares</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${share_count}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Author</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">${author.nickname}</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 text-sm font-medium text-gray-500">Author Avatar</td>
                      <td class="px-6 py-4 text-sm text-gray-500 text-center">
                        <img src="${author.avatar}" alt="Author Avatar" class="w-16 h-16 rounded-full mx-auto" />
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
            htmlFor="tiktokUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            TikTok Video URL
          </label>
          <div className="flex">
            <input
              type="text"
              id="tiktokUrl"
              name="tiktokUrl"
              placeholder="Enter TikTok video link"
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

export default TikTokDownloader;

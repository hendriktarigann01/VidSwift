import React, { useState } from "react";

const GenerateImage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State for image URL

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const prompt = document.getElementById("imagePrompt").value;
    const apiUrl = `https://api.ryzendesu.vip/api/ai/flux-diffusion?prompt=${encodeURIComponent(
      prompt
    )}`; 

    fetch(apiUrl)
      .then((response) => response.blob()) // Fetch image as blob
      .then((blob) => {
        setLoading(false);
        const imageUrl = URL.createObjectURL(blob); // Create URL for blob
        setImageUrl(imageUrl); // Set the image URL in state
        const formattedResult = `
          <div class="flex justify-center">
            <img src="${imageUrl}" alt="Generated" class="w-full max-w-3xl object-cover" />
          </div>
        `;
        setResult(formattedResult);
      })
      .catch(() => {
        setLoading(false);
        setResult(
          '<p class="text-red-500">Failed to generate image. Please try again later.</p>'
        );
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center mt-10">
        <div className="relative w-3/4">
          <label
            htmlFor="imagePrompt"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image Generation Prompt Using Flux Diffusion
          </label>
          <div className="flex">
            <input
              type="text"
              id="imagePrompt"
              name="imagePrompt"
              placeholder="Enter prompt for image generation"
              className="appearance-none rounded-l border-2 w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 border-2 border-gray-200 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
            >
              Generate
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
            Generating...
          </span>
        </div>
      )}

      <div className="mt-4" dangerouslySetInnerHTML={{ __html: result }}></div>

      {imageUrl && (
        <div className="flex justify-center mt-4">
          <a
            href={imageUrl}
            download="generated_image.png"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default GenerateImage;

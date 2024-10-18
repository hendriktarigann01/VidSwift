import React from "react";

const InstagramFeatures = () => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold mb-4">Instagram</h2>
      <p className="mb-2">Tambah Like, View, atau Followers di Instagram</p>
      <button className="px-4 py-2 bg-pink-500 text-white rounded-lg mb-2">
        Tambah Like
      </button>
      <button className="px-4 py-2 bg-pink-500 text-white rounded-lg mb-2">
        Tambah View
      </button>
      <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">
        Tambah Followers
      </button>
    </div>
  );
};

export default InstagramFeatures;

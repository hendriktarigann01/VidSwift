import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 dark:bg-gray-600">
      <div className="max-w-3xl  bg-white shadow-lg rounded-lg p-6 dark:bg-[#566e8c]">
        <h1 className="text-2xl font-bold mb-4 text-gray-600 dark:text-slate-200">
          About VidSwift
        </h1>
        <p className="text-justify text-gray-500 leading-relaxed dark:text-slate-300">
          VidSwift is a versatile and powerful tool designed to help you
          download videos from various platforms like YouTube, Facebook, TikTok,
          and Instagram. Whether you need to save videos for offline viewing or
          want to extract media from social platforms, VidSwift makes it fast
          and easy.
        </p>
        <p className="mt-2 text-justify text-gray-500 leading-relaxed dark:text-slate-300">
          In addition to video downloads, VidSwift also allows users to generate
          images and remove backgrounds from photos effortlessly, making it an
          all-in-one media tool for content creators and everyday users.
        </p>
      </div>
    </div>
  );
};

export default About;

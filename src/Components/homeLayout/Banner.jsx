import React from "react";
const Banner = () => {
  return (
    <div
      className=" h-[100vh] flex items-center justify-start"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-white px-6 md:px-12 lg:px-20 max-w-2xl">
        <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
          Feel free to start streaming for free
        </h1>
        <p className="text-lg md:text-lg lg:text-xl mb-8 text-gray-100 leading-relaxed">
          With MovieVerse you can watch over 20,000 free movies and shows, plus
          Live TV on almost any device. What are you waiting for?
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-medium font-bold py-3 px-5 rounded-lg text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25">
          Explore Movies
        </button>
      </div>
    </div>
  );
};

export default Banner;

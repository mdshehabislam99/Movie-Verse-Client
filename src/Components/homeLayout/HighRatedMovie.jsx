import React from "react";
import { FaPlay } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router";

const HighRatedMovies = ({ movie }) => {
  const { rating,posterUrl, title, genre, releaseYear, duration } = movie;

  return (
    <div
      className="text-center relative group  backdrop-blur-lg
       rounded-2xl bg-gray-800/80  hover:bg-gray-800/30
    overflow-hidden shadow-xl hover:shadow-gray-500/20
     transition-all duration-500 hover:scale-105"
    >
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-80 object-cover 
          transform group-hover:scale-110 transition-transform duration-700"
        />

        <div
          className="flex gap-1 absolute bg-purple-600/20 
         border border-purple-500/30 top-4 right-4 font-bold px-3 py-1 
         rounded-full text-sm shadow-lg"
        >
          <FcRating className="w-5 h-5" />
          {rating}
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-amber-500 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Link to="/movie-details"> View Details</Link>
          </button>
        </div>
      </div>
      <div className="my-4 ">
        <h3 className="text-2xl font-bold text-white line-clamp-2">{title}</h3>
      </div>
    </div>
  );
};

export default HighRatedMovies;

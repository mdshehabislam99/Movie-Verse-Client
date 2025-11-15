import React from "react";
import { FcRating } from "react-icons/fc";
import { FaPlay, FaClock, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const MovieDetailsCard = ({ movie }) => {
  const {
    title,
    genre,
    releaseYear,
    rating,
    duration,
    posterUrl,
    director,
    language,
    country,
    addedBy,
    plotSummary,
    cast,
  } = movie;
    if (!movie) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              No Movie Data
            </h1>
            <p className="text-gray-300">Movie prop is undefined or null</p>
          </div>
        </div>
      );
    }
  return (
    <div >
      <div className="mx-auto px-4">
        <button className="mb-8 flex
         items-center space-x-2
          text-gray-300 hover:text-white
           transition-colors duration-300">
     
          <span>Back to Movies</span>
        </button>

        <div className="bg-gray-800/50 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Poster Section */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={posterUrl}
                  alt={title}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-purple-600/20 backdrop-blur-lg border border-purple-500/30 rounded-full px-4 py-2 flex items-center space-x-2">
                  <FcRating className="w-6 h-6" />
                  <span className="text-white font-bold text-lg">
                    {rating}/10
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 left-4 bg-blue-600/20 backdrop-blur-lg border border-blue-500/30 rounded-full px-4 py-2">
                  <span className="text-white font-semibold">
                    {releaseYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {title}
                </h1>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2">
                  {genre.split(",").map((genreItem, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      {genreItem.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
                  <FaClock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-semibold">
                      {duration} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
                  <FaPlay className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Director</p>
                    <p className="text-white font-semibold">{director}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
                  <FaGlobe className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Language</p>
                    <p className="text-white font-semibold">{language}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-4">
                  <FaMapMarkerAlt className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Country</p>
                    <p className="text-white font-semibold">{country}</p>
                  </div>
                </div>
              </div>

              {/* Cast Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Cast</h3>
                <div className="flex flex-wrap gap-3">
                  {cast.split(",").map((actor, index) => (
                    <span
                      key={index}
                      className="bg-gray-700/70 backdrop-blur-lg border border-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600/70 transition-colors duration-300"
                    >
                      {actor.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plot Summary */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Plot Summary</h3>
                <p className="text-gray-300 text-lg leading-relaxed bg-gray-700/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-600">
                  {plotSummary}
                </p>
              </div>

              {/* Added By Section */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
                <p className="text-gray-300">
                  Added by:{" "}
                  <span className="text-white font-semibold">{addedBy}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2">
                  <span>Add to Collection</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2">
                  <span>Watch Trailer</span>
                  <FaPlay className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;

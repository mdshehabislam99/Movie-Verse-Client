import React from "react";

const MovieCard = ({ movie }) => {
  const {
    _id,
    title,
    genre,
    releaseYear,
    director,
    cast,
    rating,
    duration,
    plotSummary,
    posterUrl,
    language,
    country,
    addedBy,
  } = movie;

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 transform">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Poster Container */}
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
          ⭐ {rating}
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {releaseYear}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Watch Trailer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h3>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {genre.split(", ").map((g, index) => (
            <span
              key={index}
              className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-md text-xs border border-purple-500/30"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Plot Summary */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {plotSummary}
        </p>

        {/* Movie Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-purple-400">⏱️</span>
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">🌐</span>
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">🎬</span>
            <span className="truncate" title={director}>
              {director.split(",")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400">📍</span>
            <span>{country}</span>
          </div>
        </div>

        {/* Cast Preview */}
        <div className="mb-4">
          <p className="text-gray-400 text-xs mb-1">Starring:</p>
          <p className="text-gray-300 text-sm line-clamp-1">
            {cast.split(",").slice(0, 2).join(", ")}
            {cast.split(",").length > 2 && "..."}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <span className="text-gray-500 text-xs">
            Added by: <span className="text-purple-400">{addedBy}</span>
          </span>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
            Add to Collection
          </button>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default MovieCard;

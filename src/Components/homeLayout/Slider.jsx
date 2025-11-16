import React, { useState } from "react";

const Slider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const getVisibleCards = () => {
    const cards = [];
    const totalMovies = movies.length;

    // Previous card
    const prevIndex = currentIndex === 0 ? totalMovies - 1 : currentIndex - 1;
    cards.push({
      ...movies[prevIndex],
      position: "left",
      index: prevIndex,
    });

    // Current card (center)
    cards.push({
      ...movies[currentIndex],
      position: "center",
      index: currentIndex,
    });

    // Next card
    const nextIndex = currentIndex === totalMovies - 1 ? 0 : currentIndex + 1;
    cards.push({
      ...movies[nextIndex],
      position: "right",
      index: nextIndex,
    });

    return cards;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Slider Container */}
      <div className="relative h-96 flex items-center justify-center">
        {getVisibleCards().map((movie, index) => (
          <div
            key={`${movie._id}-${index}`}
            className={`absolute transition-all duration-500 ease-in-out cursor-pointer
              ${
                movie.position === "left"
                  ? "left-0 transform -translate-x-10 scale-90 opacity-70 z-10"
                  : movie.position === "center"
                  ? "left-1/2 transform -translate-x-1/2 scale-100 opacity-100 z-20"
                  : "left-full transform translate-x-10 scale-90 opacity-70 z-10"
              }`}
            onClick={() => {
              if (movie.position === "left") {
                prevSlide();
              } else if (movie.position === "right") {
                nextSlide();
              }
              // Center card remains clickable for other actions
            }}
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl overflow-hidden 
              ${movie.position === "center" ? "w-80" : "w-64"} 
              transition-all duration-500`}
            >
              {/* Movie Poster */}
              <div
                className={`relative ${
                  movie.position === "center" ? "h-48" : "h-40"
                } overflow-hidden`}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full font-bold text-sm">
                  {movie.rating}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4">
                <h3
                  className={`font-bold text-gray-800 ${
                    movie.position === "center" ? "text-xl" : "text-lg"
                  }`}
                >
                  {movie.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{movie.genre}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500 text-xs">{movie.releaseYear}</p>
                  <p className="text-gray-500 text-xs">
                    {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                  </p>
                </div>
                <p className="text-gray-500 text-xs mt-2 truncate">
                  {movie.director}
                </p>

                {movie.position === "center" && (
                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                    <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                      Add to Collection
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all z-30"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all z-30"
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;

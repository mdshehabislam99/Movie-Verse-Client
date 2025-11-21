import React, { useEffect, useState } from "react";
import MovieCard from "../MoviesLayout/MovieCard";
import { useParams } from "react-router";
import axios from "axios";

const RecentlyAddMovie = () => {
 const { moviesId } = useParams();
 const [movies, setMovies] = useState([]);
 const [loading, setLoading] = useState(true);
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
   axios
     .get("http://localhost:3000/get-all-movies")
     .then((res) => {
       setMovies(res.data);
       setLoading(false);
     })
     .catch((error) => {
       setLoading(false);
       console.error("Error fetching movies:", error);
     });
 }, [moviesId]);

  const nextSlide = () => {
    if (movies.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (movies.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const getVisibleCards = () => {
    if (movies.length === 0) return [];

    const totalMovies = movies.length;
    const cards = [];

    // Left cards (2 cards) - SAME AS FEATUREHERO
    for (let i = -2; i < 0; i++) {
      const index = (currentIndex + i + totalMovies) % totalMovies;
      cards.push({
        ...movies[index],
        position: `left-${Math.abs(i)}`,
        index: index,
      });
    }

    // Center card (active) - SAME AS FEATUREHERO
    cards.push({
      ...movies[currentIndex],
      position: "center",
      index: currentIndex,
    });

    for (let i = 1; i <= 2; i++) {
      const index = (currentIndex + i) % totalMovies;
      cards.push({
        ...movies[index],
        position: `right-${i}`,
        index: index,
      });
    }

    return cards;
  };
 if (loading) {
   return (
     <div className="relative h-screen flex items-center justify-center">
       <div className="text-white text-xl">Loading...</div>
     </div>
   );
 }
 if (movies.length === 0) {
   return (
     <div className="relative h-screen flex items-center justify-center">
       <p className="text-amber-500 text-4xl text-center font-semibold">
         No movies found
       </p>
     </div>
   );
 }


  return (
    <div className="relative w-full mx-auto text-center py-8">
      <h1 className="font-bubble text-5xl font-bold mb-3">
        Recently Added <span className=" text-green-500">Movie</span>'s
      </h1>
      <div className="relative h-120 flex items-center justify-center">
        {getVisibleCards().map((movieItem, index) => (
          <div
            key={`${movieItem?._id}-${index}`}
            className={`absolute transition-all duration-500 cursor-pointer
              ${
                movieItem?.position === "center"
                  ? "left-1/2 transform -translate-x-1/2 scale-100 opacity-100 z-30"
                  : movieItem?.position === "left-1"
                  ? "left-[30%] transform -translate-x-[65%] scale-100 opacity-80 z-25"
                  : movieItem?.position === "left-2"
                  ? "left-[20%] transform -translate-x-[120%] scale-90 opacity-70 z-20"
                  : movieItem?.position === "right-1"
                  ? "left-[70%] transform -translate-x-[35%] scale-100 opacity-80 z-25"
                  : "left-[80%] transform  translate-x-[20%] scale-90 opacity-60 z-15"
              }`}
            onClick={() => {
              if (movieItem?.position.startsWith("left")) {
                prevSlide();
              } else if (movieItem?.position.startsWith("right")) {
                nextSlide();
              }
            }}
          >
            {movieItem?.position === "center" ? (
              <MovieCard movie={movieItem} />
            ) : (
              <div
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden 
                ${movieItem?.position.includes("1") ? "w-64" : "w-56"} 
                transition-all duration-500 relative`}
              >
                <div className="absolute inset-0 bg-black/60 rounded-2xl z-10"></div>

                <div
                  className={`relative ${
                    movieItem?.position.includes("1") ? "h-40" : "h-36"
                  } overflow-hidden`}
                >
                  <img
                    src={movieItem?.posterUrl}
                    alt={movieItem?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddMovie;

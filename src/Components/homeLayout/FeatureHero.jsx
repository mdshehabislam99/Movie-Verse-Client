import React, { useEffect, useState } from "react";
import MovieCard from "../MoviesLayout/MovieCard";
import { useParams } from "react-router";
import { axiosInstance } from "../../Hook/useAxios";

const FeatureHero = () => {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axiosInstance
      .get("/get-all-movies")
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
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    if (movies.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1,
    );
  };

  const getVisibleCards = () => {
    if (movies.length === 0) return [];

    const totalMovies = movies.length;
    const cards = [];

    for (let i = -2; i < 0; i++) {
      const index = (currentIndex + i + totalMovies) % totalMovies;
      cards.push({
        ...movies[index],
        position: `left-${Math.abs(i)}`,
        index: index,
      });
    }

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

  const getCardClasses = (position) => {
    const baseClass = "absolute transition-all duration-500 cursor-pointer";

    switch (position) {
      case "center":
        return `${baseClass} left-1/2 transform -translate-x-1/2 scale-100 opacity-100 z-30`;
      case "left-1":
        return `${baseClass} left-[30%] transform -translate-x-[65%] scale-100 opacity-80 z-25`;
      case "left-2":
        return `${baseClass} left-[20%] transform -translate-x-[120%] scale-90 opacity-70 z-20`;
      case "right-1":
        return `${baseClass} left-[70%] transform -translate-x-[35%] scale-100 opacity-80 z-25`;
      case "right-2":
        return `${baseClass} left-[80%] transform translate-x-[20%] scale-90 opacity-60 z-15`;
      default:
        return baseClass;
    }
  };

  const getPosterUrlSizeClasses = (position) => {
    const widthClass = position.includes("1") ? "w-64" : "w-56";
    const heightClass = position.includes("1") ? "h-40" : "h-36";

    return `${widthClass} ${heightClass}`;
  };

  if (loading) return <div></div>;
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
        All <span className="text-green-500">Movie</span>'s Features Here
      </h1>
      <div className="relative h-120 flex items-center justify-center">
        {getVisibleCards().map((movieItem, index) => (
          <div
            key={`${movieItem?._id}-${index}`}
            className={getCardClasses(movieItem?.position)}
            onClick={() => {
              if (movieItem?.position.startsWith("left")) {
                prevSlide();
              } else if (movieItem?.position.startsWith("right")) {
                nextSlide();
              }
            }}
          >
            {movieItem?.position === "center" ?
              <MovieCard movie={movieItem} />
            : <div
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 relative ${getPosterUrlSizeClasses(
                  movieItem?.position,
                )}`}
              >
                <div className="absolute inset-0 bg-black/60 rounded-2xl z-10"></div>
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={movieItem?.posterUrl}
                    alt={movieItem?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHero;

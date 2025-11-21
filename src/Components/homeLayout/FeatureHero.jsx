import React, { useEffect, useState } from "react";
import MovieCard from "../MoviesLayout/MovieCard";
import axios from "axios";
import { useParams } from "react-router";
import GlobalLoader from "../GlobalLoader/GlobalLoader";

const FeatureHero = () => {
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

    // Left cards (2 cards)
    for (let i = -2; i < 0; i++) {
      const index = (currentIndex + i + totalMovies) % totalMovies;
      cards.push({
        ...movies[index],
        position: `left-${Math.abs(i)}`,
        index: index,
      });
    }

    // Center card (active)
    cards.push({
      ...movies[currentIndex],
      position: "center",
      index: currentIndex,
    });

    // Right cards (2 cards)
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
    const baseClass = "card";

    switch (position) {
      case "center":
        return `${baseClass} center-lg center-md center-sm`;
      case "left-1":
        return `${baseClass} left-1-lg left-1-md left-1-sm`;
      case "left-2":
        return `${baseClass} left-2-lg hidden-md hidden-sm`;
      case "right-1":
        return `${baseClass} right-1-lg right-1-md right-1-sm`;
      case "right-2":
        return `${baseClass} right-2-lg hidden-md hidden-sm`;
      default:
        return baseClass;
    }
  };

  const getPosterSizeClasses = (position) => {
    const widthClass = position.includes("1") ? "poster-w64" : "poster-w56";
    const heightClass = position.includes("1") ? "poster-h40" : "poster-h36";

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
    <div className="container">
      <h1 className="font-bubble title">
        Featured All <span className="text-green-500 ml-1">Movie</span>'s
      </h1>
      <div className="slider">
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
            {movieItem?.position === "center" ? (
              <MovieCard movie={movieItem} />
            ) : (
              <div
                className={`poster-card ${getPosterSizeClasses(
                  movieItem?.position
                )}`}
              >
                <div className="poster-overlay"></div>
                <div className="poster-image">
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

export default FeatureHero;

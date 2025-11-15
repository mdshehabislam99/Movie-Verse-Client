import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedMovies } from "../../api/movieApi";

const HeroSection = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const movies = await getFeaturedMovies();
        setFeaturedMovies(movies);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedMovies();
  }, []);

  useEffect(() => {
    if (featuredMovies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredMovies]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Background Slides */}
      <div className="relative h-screen">
        {featuredMovies.map((movie, index) => (
          <div
            key={movie._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${movie.posterUrl})`,
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-2xl text-white">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie._id}
              className={`transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10 absolute"
              }`}
            >
              <span className="inline-block px-4 py-2 bg-blue-600 rounded-full text-sm font-semibold mb-4 animate-pulse">
                Featured Movie
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                {movie.title}
              </h1>
              <div className="flex items-center space-x-6 mb-6 text-lg">
                <span className="flex items-center space-x-2 animate-slide-in-up">
                  <span className="text-yellow-400">⭐</span>
                  <span>{movie.rating}/10</span>
                </span>
                <span
                  className="bg-gray-700 px-3 py-1 rounded-full animate-slide-in-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  {movie.genre}
                </span>
                <span
                  className="animate-slide-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  {movie.releaseYear}
                </span>
              </div>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed animate-slide-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                {movie.plotSummary?.substring(0, 200)}...
              </p>
              <div
                className="flex space-x-4 animate-slide-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Link
                  to={`/movies/${movie._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Watch Now
                </Link>
                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

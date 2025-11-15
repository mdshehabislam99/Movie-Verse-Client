import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentlyAddedMovies } from "../../api/movieApi";

const RecentlyAdd = () => {
  const [recentMovies, setRecentMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const movies = await getRecentlyAddedMovies(6);
        setRecentMovies(movies);
      } catch (error) {
        console.error("Error fetching recent movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentMovies();
  }, []);

  const MovieCard = ({ movie, delay }) => (
    <div
      className="group bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400/1f2937/6b7280?text=No+Image";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/movies/${movie._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-sm font-bold flex items-center space-x-1 animate-pulse">
          <span>⭐</span>
          <span>{movie.rating}</span>
        </div>

        {/* New Badge */}
        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
          NEW
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
          {movie.title}
        </h3>

        <div className="flex items-center justify-between text-gray-300 mb-3">
          <span className="text-sm">{movie.releaseYear}</span>
          <span className="bg-gray-700 px-2 py-1 rounded text-xs">
            {movie.genre}
          </span>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {movie.plotSummary?.substring(0, 80)}...
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">By {movie.director}</span>
          <Link
            to={`/movies/${movie._id}`}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="animate-pulse bg-gray-700 h-8 w-64 rounded mb-2"></div>
              <div className="animate-pulse bg-gray-700 h-4 w-48 rounded"></div>
            </div>
            <div className="animate-pulse bg-gray-700 h-10 w-32 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-800 rounded-xl h-96"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 animate-fade-in">
              Recently Added
            </h2>
            <p
              className="text-xl text-gray-300 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Check out the latest additions to our collection
            </p>
          </div>
          <Link
            to="/movies"
            className="hidden md:inline-flex items-center space-x-2 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <span>View All</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentMovies.map((movie, index) => (
            <MovieCard key={movie._id} movie={movie} delay={index * 100} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div
          className="text-center mt-12 md:hidden animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            to="/movies"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <span>View All Movies</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAdd;

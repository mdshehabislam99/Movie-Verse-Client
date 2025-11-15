import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopRatedMovies } from "../../api/movieApi";

const TopRatedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const movies = await getTopRatedMovies(5);
        setTopMovies(movies);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopMovies();
  }, []);

  const MovieCard = ({ movie, rank, delay }) => (
    <div
      className="group relative bg-gray-800 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Rank Badge */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-bounce">
        #{rank}
      </div>

      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400/1f2937/6b7280?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white font-semibold">{movie.rating}/10</span>
          </div>
          <Link
            to={`/movies/${movie._id}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-gray-300">
          <span>{movie.releaseYear}</span>
          <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
            {movie.genre}
          </span>
        </div>
        <p className="text-gray-400 mt-3 line-clamp-2">
          {movie.plotSummary?.substring(0, 100)}...
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Top Rated Movies
            </h2>
            <div className="animate-pulse bg-gray-700 h-4 w-48 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-800 rounded-2xl h-96"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Top Rated Movies
          </h2>
          <p
            className="text-xl text-gray-300 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Discover the highest-rated films in our collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topMovies.map((movie, index) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              rank={index + 1}
              delay={index * 100}
            />
          ))}
        </div>

        <div
          className="text-center mt-12 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            to="/movies"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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

export default TopRatedMovies;

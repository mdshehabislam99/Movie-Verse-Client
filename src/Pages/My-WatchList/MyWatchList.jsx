import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "../../Components/MoviesLayout/MovieCard";
import toast from "react-hot-toast";
import { useAuth } from "../../Provider/AuthProvider";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";

const MyWatchList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/my-movie-watchlist?email=${user.email}`)
      .then((res) => {
        setMovies(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        toast.error("Failed to load your movies");
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <GlobalLoader></GlobalLoader>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center py-16">
          <div className="text-amber-500 text-3xl mb-4">
            Your Movie List is Empty
          </div>
          <Link
            to="/add-movie"
            className="inline-block bg-green-600 hover:bg-amber-700 text-white 
            px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Add Your First Movie
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bol font-bubble">
            My <span className="text-green-500 "> Movie</span>'S (
            <span className="text-blue-600">{movies.length}</span>)
          </h1>
          <Link
            to="/add-movie"
            className="bg-green-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Add New Movie
          </Link>
        </div>
        <div
          className="grid mt-10 ml-18 md:ml-20 lg:ml-25 grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 gap-8"
        >
          {movies.map((movie) => (
            <div key={movie._id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWatchList;

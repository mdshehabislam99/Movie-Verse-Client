import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";
import toast from "react-hot-toast";

const MyCollection = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    axios
      .get(`http://localhost:3000/get-all-collection?email=${user.email}`)
      .then((res) => {
        setMovies(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching collection:", error);
        toast.error("Failed to load your collection");
        setLoading(false);
      });
  }, [user?.email]);

  const handleDeleteConfirmed = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie? from your collection?"
    );

    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:3000/delete-collection?id=${id}`)
      .then((res) => {
        setMovies((prev) => prev.filter((m) => m._id !== id));
        toast.success("Opps..Movie removed from your collection");
        console.log(res)
      })
      .catch((error) => {
        console.error("Delete error:", error);
        toast.error("Failed to remove movie");
      });
  };

  if (loading) {
    return <GlobalLoader />;
  }

  if (!movies.length) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-400 text-2xl font-semibold mb-6">
          No movie?s in your collection
        </p>
        <Link
          to="/all-movie?"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-20">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-center text-4xl 
        font-bubble font-bold"
        >
          My Collection
        </h1>

        <div
          className="grid gap-10 grid-cols-1 
        mt-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {movies.map((movie) => (
            <div
              key={movie?._id}
              className="w-full mx-auto 
            max-w-xs"
            >
              <div
                className="text-center 
              relative backdrop-blur-lg 
              rounded-2xl bg-gray-800/70 overflow-hidden 
              shadow-xl transition-transform duration-500 
              hover:scale-105 h-[410px] flex flex-col"
              >
         
                <div className="relative">
                  <img
                    src={movie?.posterUrl}
                    alt={movie?.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="mt-3 px-4">
                  <h3 className="text-white text-2xl font-bold line-clamp-2">
                    {movie?.title}
                  </h3>
                </div>

                <div className="flex justify-end mr-2">
                  <button
                    onClick={() => handleDeleteConfirmed(movie?._id)}
                    className="bg-red-600 
                    hover:bg-red-700 text-white px-4 py-2 
                    rounded-full font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;

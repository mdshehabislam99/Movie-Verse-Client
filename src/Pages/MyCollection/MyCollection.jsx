// MyCollection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { FaPlay } from "react-icons/fa6";
import { useAuth } from "../../Provider/AuthProvider"; 

const Toast = ({ msg, type = "info", onClose }) => {
  if (!msg) return null;
  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700";
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-md text-white ${bg} shadow-lg`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>{msg}</div>
        <button onClick={onClose} className="font-bold ml-4">
          ✕
        </button>
      </div>
    </div>
  );
};

const MyCollection = () => {
  const { user } = useAuth();
  const [allItems, setAllItems] = useState([]); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState({ msg: "", type: null });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/get-all-collection")
      .then((res) => {
        const userload = Array.isArray(res.data) ? res.data : [];
        setAllItems(userload);

        if (user && user.email) {
          const filtered = userload.filter((m) => m.addedBy === user.email);
          setMovies(filtered);
        } else {
          setMovies([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching collection:", error);
        setToast({ msg: "Failed to load collection", type: "error" });
        setLoading(false);
      });
  }, [user?.email]);

  // open confirmation modal
  const confirmDelete = (id) => {
    setDeleteTarget(id);
    setIsModalOpen(true);
  };

  // actual delete
  const handleDeleteConfirmed = () => {
    const id = deleteTarget;
   
    axios
      .delete(`http://localhost:3000/delete-collection?id=${id}`)
      .then((res) => {
        setMovies((prev) => prev.filter((m) => m._id !== id));
        setToast({ msg: "Removed from collection", type: "success" });
      })
      .catch((err) => {
        console.error("Delete error:", err);
        setToast({ msg: "Failed to remove item", type: "error" });
      })
      .finally(() => {
        setIsModalOpen(false);
        setDeleteTarget(null);
      });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading your collection...</div>
      </div>
    );
  }
if (!movies || movies.length === 0){

  return (
    <div className="text-center py-20">
      <p className="text-amber-400 text-2xl font-semibold mb-6">
        No movies in your collection
      </p>
      <Link
        to="/all-movie"
        className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition"
      >
        Browse Movies
      </Link>
    </div>
  );
}
  return (
    <div className="h-screen my-20">
      <Toast
        msg={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: "", type: null })}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bubble font-bold text-white">
            My Collection
          </h1>
        </div>
          <div className="grid gap-10 grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie) => (
              <div key={movie?._id} className="w-full mx-auto max-w-xs">
                <div className="text-center relative group backdrop-blur-lg rounded-2xl bg-gray-800/70 overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105 h-[450px] flex flex-col">
                  <div className="relative">
                    <img
                      src={movie?.posterUrl}
                      alt={movie?.title}
                      className="w-full h-80 object-cover transform group-hover:scale-105 transition duration-500"
                    />

                    {/* rating & year badges */}
                    <div className="absolute top-4 right-4 bg-purple-600/20 border border-purple-500/30 px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
                      <FcRating />
                      <span className="font-semibold">{movie?.rating}</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-purple-600/20 border border-purple-500/30 px-3 py-1 rounded-full text-white text-sm">
                      {movie?.releaseYear}
                    </div>

                    {/* overlay view details */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        to={`/movies/${movie?._id}`}
                        className="bg-amber-500 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold"
                      >
                        View Details
                      </Link>
                    </div>

                    {/* genre pills */}
                    <div className="absolute left-4 bottom-4 flex gap-2 flex-wrap">
                      {(movie.genre || "")
                        .split(",")
                        .slice(0, 3)
                        .map((g, i) => (
                          <span
                            key={i}
                            className="bg-purple-600/20 px-2 py-1 rounded-full text-xs border border-purple-500/30 text-white"
                          >
                            {g.trim()}
                          </span>
                        ))}
                    </div>

                    {/* duration */}
                    <div className="absolute right-4 bottom-4 bg-purple-600/20 border border-purple-500/30 rounded-full px-2 py-1 text-white flex items-center gap-1">
                      <FaPlay />
                      <span className="text-sm">{movie?.duration} min</span>
                    </div>
                  </div>

                  {/* title */}
                  <div className="mt-3 px-4">
                    <h3 className="text-white text-2xl font-bold line-clamp-2">
                      {movie?.title}
                    </h3>
                  </div>

                  {/* actions */}
                  <div className="mt-auto p-4 flex gap-3 justify-between">
                    <Link to={`/update-movie/${movie?._id}`}>
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold transition"
                        style={{
                          display:
                            movie.addedBy === user?.email
                              ? "inline-flex"
                              : "none",
                        }}
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => confirmDelete(movie._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition"
                      style={{
                        display:
                          movie.addedBy === user?.email
                            ? "inline-flex"
                            : "none",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setDeleteTarget(null);
              }}
              className="px-4 py-2 rounded-full border"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirmed}
              className="px-4 py-2 rounded-full bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollection;

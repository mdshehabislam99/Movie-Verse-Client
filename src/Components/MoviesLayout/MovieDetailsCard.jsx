import React from "react";
import { FcRating } from "react-icons/fc";
import { FaClock, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import { IoFilmSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../../Provider/AuthProvider";
import { axiosInstance } from "../../Hook/useAxios";

const MovieDetailsCard = ({ movie }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) {
      return;
    }

    axiosInstance
      .delete(`/delete-movie?id=${id}`)
      .then((res) => {
   
        toast.success("Movie deleted successfully", res);
        navigate("/all-movie");
      })
      .catch((error) => {
    
        toast.error("Failed to delete movie", error);
      });
  };

  const isOwner = user && movie?.addedBy === user.email;

  if (!movie) {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <p className="text-amber-300 text-4xl font-bold">
          Movie prop is undefined or null
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto p-13">
        <button className="mb-7 flex items-center space-x-2 text-red-500 font-bold text-3xl hover:text-amber-500 transition-colors duration-300">
          <Link to="/all-movie">
            <div className="flex gap-1">
              <span className="mt-1">
                <FaArrowCircleLeft />
              </span>
              <span>Back to Movies</span>
            </div>
          </Link>
        </button>

        <div className="bg-gradient-to-r from-pink-300 to-green-400 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-10">
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  src={movie?.posterUrl}
                  alt={movie?.title}
                  className="min-h-screen object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {movie?.title}
                </h1>

                <div className="flex gap-2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 backdrop-blur-lg rounded-full px-4 py-2 flex items-center space-x-2">
                    <IoFilmSharp className="w-6 h-6 text-green-400" />
                    {(movie?.genre ? movie.genre.split(",") : []).map(
                      (genreItem, index) => (
                        <span key={index} className="font-semibold text-lg">
                          {genreItem.trim()}
                        </span>
                      ),
                    )}
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 backdrop-blur-lg rounded-full px-4 py-2 flex items-center space-x-2">
                    <FcRating className="w-6 h-6" />
                    <span className="font-semibold text-lg">
                      {movie?.rating}/10
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 backdrop-blur-lg rounded-full px-4 py-2 flex items-center space-x-2">
                    <MdDateRange className="w-6 h-6 text-amber-400" />
                    <span className="font-semibold text-lg">
                      {movie?.releaseYear}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 max-w-md space-y-3">
                <div className="flex items-center space-x-2">
                  <FaClock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm">Duration</p>
                    <p className="font-semibold text-lg">
                      {movie?.duration} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <GiFilmProjector className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm">Director</p>
                    <p className="font-semibold text-lg">{movie?.director}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 transform">
                  <FaGlobe className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm">Language</p>
                    <p className="font-semibold text-lg">{movie?.language}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm">Country</p>
                    <p className="font-semibold text-lg">{movie?.country}</p>
                  </div>
                </div>
              </div>

              {/* Cast Section */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Cast</h3>
                <div className="flex flex-wrap gap-3">
                  {(movie?.cast ? movie.cast.split(",") : []).map(
                    (actor, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/70 backdrop-blur-lg px-4 py-2 rounded-full font-semibold text-lg bg-gradient-to-r from-red-500 to-purple-600"
                      >
                        {actor.trim()}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">Plot Summary</h3>
                <p className="font-semibold text-lg p-2">
                  {movie?.plotSummary}
                </p>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Added by Writer</h1>
                <span className="text-lg text-blue-600 font-semibold p-1">
                  {movie?.addedBy}
                </span>
              </div>

              {isOwner && (
                <div className="flex flex-col sm:flex-row gap-4 text-lg font-semibold">
                  <Link
                    to={`/update-movie/${movie?._id}`}
                    className="flex-1 bg-green-500 hover:bg-amber-500 py-4 rounded-full transition-all duration-300 transform hover:scale-105 text-white flex items-center justify-center space-x-2"
                  >
                    <button>Edit Movie</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(movie?._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 py-4 text-white rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    Delete
                  </button>
                </div>
              )}

              {!isOwner && user && (
                <div className="text-center ">
                  <p className="text-yellow-800 font-semibold">
                    Only Owner edit or delete this movies .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;

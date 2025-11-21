import React from "react";
import { FcRating } from "react-icons/fc";
import { FaPlay } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../Provider/AuthProvider";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); //

 const handleAddtoCollection = () => {
   if (!user) {
     alert("Please login first");
     return navigate("/login");
   }

   const userload = {
     ...movie,
     addedBy: user.email,
   };
   delete userload._id; 
   axios
     .post("http://localhost:3000/add-to-collection", userload)
     .then((res) => {
       alert("Movie added to your collection!");
       navigate("/my-collection");
     })
     .catch((err) => {
       console.log("Add error:", err);
       alert("Failed to add movie.");
     });
 };


  return (
    <div
      className="text-center relative group backdrop-blur-lg rounded-2xl 
      bg-gray-800/80 hover:bg-gray-800/30 overflow-hidden shadow-xl 
      transition-all duration-500 hover:scale-105 w-80 h-[420px] flex flex-col"
    >
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={movie?.posterUrl}
          alt={movie?.title}
          className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        <div className="flex gap-1 absolute bg-purple-600/20 border border-purple-500/30 top-4 right-4 font-bold px-3 py-1 rounded-full text-white text-sm shadow-lg">
          <FcRating className="w-5 h-5" />
          {movie?.rating}
        </div>

        <div className="absolute top-4 left-4 bg-purple-600/20 text-white border border-purple-500/30 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {movie?.releaseYear}
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-amber-500 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Link to={`/single-movie-details/${movie?._id}`}>View Details</Link>
          </button>
        </div>

        <div className="absolute bottom-4 left-4 text-white flex flex-wrap gap-2 mb-3">
          {movie?.genre.split(", ").map((g, index) => (
            <span
              key={index}
              className="bg-purple-600/20 px-2 py-1 rounded-full text-xs border border-purple-500/30"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="absolute bg-purple-600/20 text-white border border-purple-500/30 rounded-full px-2 py-1 bottom-4 right-4 flex gap-1 mb-3">
          <FaPlay className="h-4 w-4 text-purple-400" />
          <span>{movie?.duration} min</span>
        </div>
      </div>

      <div className="mt-2 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white line-clamp-2">
          {movie?.title}
        </h3>
      </div>

      <div className="flex mt-auto justify-end gap-4 p-2">
        <button
          onClick={handleAddtoCollection}
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-full 
          font-semibold transition-all duration-300 transform hover:scale-105 
          flex items-center justify-center space-x-2 shadow-lg hover:shadow-amber-500/25"
        >
          Add to Collection
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

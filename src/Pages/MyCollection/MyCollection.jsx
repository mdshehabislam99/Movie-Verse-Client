import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { FcRating } from 'react-icons/fc';
import { Link, useParams } from 'react-router';

const MyCollection = () => {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
 

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
  
  const handleDelete = (itemId) => {
    console.log(`Deleting item with ID: ${itemId}`);
  };

   if (loading) {
     return (
       <div className="relative h-screen flex items-center justify-center">
         <div className="text-white text-xl">Loading...</div>
       </div>
     );
   }
   if (movies.length === 0) {
     return (
       <div className="relative  pt-20 h-screen  justify-center">
         <div className="mb-8 text-center">
           <h1 className="text-4xl font-bold font-bubble">My Collection</h1>
           <p className="font-medium text-lg mt-2">Manage your saved items</p>
         </div>
         <p className="text-amber-500 text-4xl text-center font-semibold">
           No movies in Collection
         </p>
       </div>
     );
   }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 pt-15 text-center">
          <h1 className="text-4xl font-bold font-bubble">My Collection</h1>
          <p className="font-medium text-lg mt-2">Manage your saved items</p>
        </div>
        <div
          className="grid mt-10 ml-18 md:ml-20 lg:ml-25 grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 gap-8 mb-8"
        >
          {movies.map((movie) => (
            <div
              className="text-center relative group  backdrop-blur-lg
       rounded-2xl bg-gray-800/80  hover:bg-gray-800/30
    overflow-hidden shadow-xl hover:shadow-gray-500/20
     transition-all duration-500 hover:scale-105 w-80 h-[420px] flex flex-col"
            >
              <div className="relative overflow-hidden flex-shrink-0">
                <img
                  src={movie?.posterUrl}
                  alt={movie?.title}
                  className="w-full h-80 object-cover 
          transform group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-amber-500 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Link to={`/single-movie-details/${movie?._id}`}>
                      {" "}
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
              <div className="mt-2 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white ">
                  {movie?.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
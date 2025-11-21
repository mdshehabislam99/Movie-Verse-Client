import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import MovieCard from '../../Components/MoviesLayout/MovieCard';
import axios from 'axios';
import GlobalLoader from '../../Components/GlobalLoader/GlobalLoader';

const AllMovies = () => {

  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/get-all-movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [moviesId]);
  
  if (loading) return(<GlobalLoader></GlobalLoader>);

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
       <div className="py-20 text-center">
         <h1 className="text-4xl font-bubble font-bold mb-2">
           All
           <span className="ml-3 text-green-500">Movie</span>'S
         </h1>
         <p className="text-lg font-medium mb-5"> Explore All Movies</p>
         <div
           className="grid mt-10 ml-18 md:ml-20 lg:ml-25 grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 gap-8  "
         >
           {movies.map((movie) => (
             <MovieCard key={movie._id} movie={movie}></MovieCard>
           ))}
         </div>
       </div>
     );
};

export default AllMovies;
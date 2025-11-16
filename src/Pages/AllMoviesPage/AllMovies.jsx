import React from 'react';
import { useLoaderData } from 'react-router';
import MovieCard from '../../Components/MoviesLayout/MovieCard';

const AllMovies = () => {

const data = useLoaderData()
console.log(data)

     return (
       <div className="mb-2">
         <div className="py-20 text-center ">
           <h1 className=" text-5xl font-bold mb-2"> All Movies</h1>
           <p className="mb-7 text-3xl"> Explore All Movies</p>
           <div className="grid px-10 lg:px-6 md:px-7 grid-cols-1 mt-10  md:grid-cols-2 lg:grid-cols-4 gap-10 mad:gap-5 lg:gap-4 items-stretch">
             {data.map((movie) => (
               <MovieCard key={movie._id} movie={movie}></MovieCard>
             ))}
           </div>
         </div>
       </div>
     );
};

export default AllMovies;
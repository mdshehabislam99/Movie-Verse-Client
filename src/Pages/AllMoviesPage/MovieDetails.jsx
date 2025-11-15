import React from "react";
import {  useLoaderData } from "react-router-dom";
import MovieDetailsCard from "../../Components/MoviesLayout/MovieDetailsCard";

const MovieDetails = () => {
 
  const data = useLoaderData();
  console.log(data);


  return (
    <div className="min-h-screen p-8">
      {data.map((movie)=>(

          <MovieDetailsCard key={movie._id} movie={movie}></MovieDetailsCard>
      ))}
    </div>
  );
};

export default MovieDetails;

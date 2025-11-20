import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import MovieDetailsCard from "../../Components/MoviesLayout/MovieDetailsCard";
import axios from "axios";

const MovieDetails = () => {
   const { moviesId } = useParams();
   const [movie, setMovies] = useState([]);
   const [loding, setLoading] = useState(true);

   useEffect(() => {
     axios
       .get(`http://localhost:3000/single-movies?id=${moviesId}`)
       .then((res) => {
         setMovies(res.data);
         setLoading(false);
       })
       .catch((error) => {
         setLoading(false);
         console.log(error);
       });
   }, [moviesId]);



  return (
    <div className="min-h-screen p-8">
      <MovieDetailsCard key={movie._id} movie={movie} />
    </div>
  );
};

export default MovieDetails;

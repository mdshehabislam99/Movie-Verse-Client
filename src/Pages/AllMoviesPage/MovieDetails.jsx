import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../Components/MoviesLayout/MovieDetailsCard";
import axios from "axios";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";

const MovieDetails = () => {
  const { moviesId } = useParams();
  const [movie, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://movie-verse-server.vercel.app/single-movies?id=${moviesId}`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [moviesId]);

  if (loading) return <GlobalLoader></GlobalLoader>;

  return (
    <div className="min-h-screen p-8">
      <MovieDetailsCard key={movie._id} movie={movie} />
    </div>
  );
};

export default MovieDetails;

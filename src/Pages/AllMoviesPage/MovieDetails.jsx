import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../../Components/MoviesLayout/MovieDetailsCard";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";
import { axiosInstance } from "../../Hook/useAxios";

const MovieDetails = () => {
  const { moviesId } = useParams();
  const [movie, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/single-movies?id=${moviesId}`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
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

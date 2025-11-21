import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../../Components/MoviesLayout/MovieCard";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";

const MoviesByGenre = () => {
  const { genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies-by-genre/${genreName}`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [genreName]);

  if (loading) return(<GlobalLoader></GlobalLoader>)
  
     if (movies.length === 0) {
       return (
         <div className="relative h-screen flex items-center justify-center">
           <p className="text-amber-500 text-4xl text-center font-semibold">
             No movies found in this genre.
           </p>
         </div>
       );
     }

  return (
    <section className=" p-10 text-center mx-auto ">
      <h2 className="text-4xl mt-12  font-bubble font-bold mb-2">
        <span className="text-green-500"> Movie</span>'S in{" "}
        <span className="text-amber-400">{genreName}</span>
      </h2>
      <p className="text-lg font-medium">Explore Movie By Genre</p>

      <div
        className="grid mt-10 ml-18 md:ml-20 lg:ml-25 grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 gap-8 
        "
      >
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MoviesByGenre;



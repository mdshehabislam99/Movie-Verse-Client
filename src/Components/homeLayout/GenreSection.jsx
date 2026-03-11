import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const GenreSection = () => {
  const { moviesId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-all-movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching movies:", error);
      });
  }, [moviesId]);

  const getAllGenres = () => {
    const genreMap = {};

    const genreColors = {
      Action: "from-red-500 to-orange-500",
      Drama: "from-purple-500 to-pink-500",
      Comedy: "from-yellow-500 to-orange-500",
      "Sci-Fi": "from-blue-500 to-cyan-500",
      Animation: "from-gray-700 to-red-900",
      Romance: "from-pink-500 to-rose-500",
      Thriller: "from-gray-800 to-gray-600",
      Fantasy: "from-green-500 to-emerald-500",
      Adventure: "from-amber-500 to-red-500",
      Crime: "from-indigo-500 to-purple-500",
    };

    movies.forEach((movieItem) => {
      if (movieItem?.genre) {
        const movieGenres =
          Array.isArray(movieItem.genre) ?
            movieItem.genre
          : movieItem.genre.split(",").map((g) => g.trim());

        movieGenres.forEach((genre) => {
          const cleanGenre = genre.trim();
          if (cleanGenre) {
            genreMap[cleanGenre] = (genreMap[cleanGenre] || 0) + 1;
          }
        });
      }
    });

    return Object.entries(genreMap)
      .map(([name, count]) => ({
        name,
        count,
        color: genreColors[name] || "from-gray-500 to-gray-700",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };
  const genres = getAllGenres();
  if (loading) return <div></div>;
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bubble text-5xl font-bold mb-3">
            <span className="text-green-500">Movie</span>'S By Genre
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Explore{" "}
            <span className="font-bold text-blue-600">{movies?.length}</span>{" "}
            movies across{" "}
            <span className="font-bold text-green-600"> {genres?.length}</span>{" "}
            genres
          </p>
        </div>

        {genres?.length > 0 ?
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {genres.map((genre) => (
              <Link
                to={`/genre/${genre?.name}`}
                className={`group relative bg-gradient-to-br ${genre.color} rounded-2xl p-6 text-white overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in-up`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{genre?.name}</h3>
                  <p className="text-white/80">
                    {genre?.count} {genre?.count === 1 ? "movie" : "movies"}
                  </p>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
              </Link>
            ))}
          </div>
        : <div className="text-center py-12">
            <p className="text-amber-500 text-3xl font-semibold">
              No Genre Available
            </p>
          </div>
        }
      </div>
    </section>
  );
};

export default GenreSection;

import axios from "axios";
import { useState, useEffect } from "react";
import { FcRating } from "react-icons/fc";
import { IoFilmSharp } from "react-icons/io5";
import { PiFilmSlateBold } from "react-icons/pi";

const StatSection = () => {
  const [stats, setStats] = useState({
    totalMovies: 0,
    averageRating: 0,
    totalGenres: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      axios
        .get("https://movie-verse-server.vercel.app/stats")
        .then((res) => {
          setStats(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching movies:", error);
        });
    };
    fetchStats();
  }, []);

  if (loading) return <div></div>;

  return (
    <section className="my-20">
      <div className="mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bubble md:text-5xl font-bold mb-4">
            Statistics About{" "}
            <span
              className="text-green-500 ml-1
             hover:scale-110 transition-transform duration-200
              "
            >
              Movie
            </span>
            <span
              className="ml-3 text-blue-500 
             hover:scale-110 transition-transform duration-200
              "
            >
              VerSe
            </span>{" "}
          </h2>
          <p className="text-xl font-medium max-w-2xl mx-auto">
            Discover the amazing collection of movies in our database
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3
         lg:grid-cols-3 gap-8 max-w-md md:max-w-6xl mx-auto"
        >
          <div className="bg-green-500  rounded-2xl p-8 text-center">
            <div className="flex justify-center text-yellow-800 items-center text-4xl mb-4">
              <PiFilmSlateBold />
            </div>
            <div className="text-4xl text-blue-800 font-bold  mb-2">
              {stats?.totalMovies.toLocaleString()}
            </div>
            <div className="font-medium text-lg">Total Movies</div>
          </div>

          <div className="bg-green-500 rounded-2xl p-8 text-center ">
            <div className="flex justify-center items-center text-4xl mb-4">
              <FcRating />
            </div>
            <div className="text-4xl text-blue-800 font-bold  mb-2">
              {stats?.averageRating}
            </div>
            <div className="font-medium text-lg">Average Rating</div>
          </div>

          <div className="bg-green-500 rounded-2xl p-8 text-center">
            <div className="flex justify-center text-pink-800 items-center text-4xl mb-4">
              <IoFilmSharp />
            </div>
            <div className="text-4xl text-blue-800 font-bold  mb-2">
              {stats?.totalGenres.toLocaleString()}
            </div>
            <div className="text-lg font-medium">Movie Genres</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatSection;

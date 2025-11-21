import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";


const BannerTopRatedMovies = () => {
        const { moviesId } = useParams();
        const [movies, setMovies] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          axios
            .get("http://localhost:3000/top-rated-movies")
            .then((res) => {
              setMovies(res.data);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error fetching movies:", error);
            });
        }, [moviesId]);

  const swiperParams = {
    modules: [Autoplay, EffectFade, Navigation, Pagination],
    effect: "fade",
    speed: 1000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    navigation: true,
    loop: true,
    className: "swiper",
  };
 if (loading) return <div></div>;
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
    <div className="relative h-screen">
      <Swiper {...swiperParams}>
        {movies.map((movieItem, index) => (
          <SwiperSlide key={movieItem?._id || index}>
            <div
              className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${movieItem?.posterUrl})`,
              }}
            >
              <div className="absolute inset-0 "></div>
              <div className="relative z-10 text-white px-6 md:px-12 lg:px-20 h-full flex items-center">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                    {movieItem?.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed">
                    {movieItem?.plotSummary}
                  </p>
                  <Link
                    to="/add-movie"
                    className="bg-amber-500
                     hover:bg-amber-600 text-white font-bold py-3 px-6 
                     rounded-full text-lg transition-all duration-300 
                     transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25"
                  >
                    <button>Add More Movies</button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerTopRatedMovies;

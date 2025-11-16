import React from "react";
import Banner from "../../Components/homeLayout/Banner";
import AboutPlatform from "../../Components/homeLayout/AboutPlatform";
import { useLoaderData } from "react-router";
import HighRatedMovies from "../../Components/homeLayout/HighRatedMovie";

function Home() {
  const data = useLoaderData();
  return (
    <>
      <div className="bg-transparent container">
        <Banner></Banner>
      </div>
      <div className="grid px-10 lg:px-6 md:px-7 grid-cols-1 mt-10  md:grid-cols-2 lg:grid-cols-4 gap-10 mad:gap-5 lg:gap-4 items-stretch">
        {data.map((movie) => (
          <HighRatedMovies key={movie._id} movie={movie}></HighRatedMovies>
        ))}
      </div>
      <AboutPlatform></AboutPlatform>
    </>
  );
}

export default Home;

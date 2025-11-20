import React from "react";
import BannerTopRatedMovies from "../../Components/homeLayout/BannerTopRatedMovies";
import AboutPlatform from "../../Components/homeLayout/AboutPlatform";
import FeatureHero from "../../Components/homeLayout/FeatureHero.jsx";
import RecentlyAddMovie from "../../Components/homeLayout/RecentAddMovie.jsx";
import GenreSection from "../../Components/homeLayout/GenreSection.jsx";
import StatSection from "../../Components/homeLayout/StatSection.jsx";

function Home() {
   
  return (
    <>
      <div>
        <div>
          <BannerTopRatedMovies></BannerTopRatedMovies>
        </div>
        <div className="mt-20">
          <FeatureHero />
        </div>
        <div className="mt-10">
          <RecentlyAddMovie></RecentlyAddMovie>
        </div>
        <GenreSection></GenreSection>
        <AboutPlatform></AboutPlatform>
        <StatSection></StatSection>
      </div>
    </>
  );
}

export default Home;

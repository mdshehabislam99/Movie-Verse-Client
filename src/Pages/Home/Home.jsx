import React from "react";
import Banner from "../../Components/homeLayout/Banner";
import AboutPlatform from "../../Components/homeLayout/AboutPlatform";

function Home() {
  return (
    <>
      <div className="bg-transparent container">
        <Banner></Banner>
      </div>
      <AboutPlatform></AboutPlatform>
    </>
  );
}

export default Home;

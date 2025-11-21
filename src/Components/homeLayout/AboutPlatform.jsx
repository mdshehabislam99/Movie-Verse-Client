import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const AboutPlatform = () => {
  const features = [
    {
      title: "Comprehensive Library",
      description:
        "Access thousands of movies from various genres and eras with detailed information and metadata.",
    },
    {
      title: "Personal Collections",
      description:
        "Create and manage your own movie collections with custom categorization and personal ratings.",
    },
    {
      title: "Advanced Filtering",
      description:
        "Find exactly what you want with our powerful search and filtering options by genre, year, rating, and more.",
    },
    {
      title: "Cross-Platform",
      description:
        "Access your movie library from any device with our fully responsive design and mobile app experience.",
    },
  ];

  const FeatureCard = ({ feature }) => (
    <div
      className="backdrop-blur-lg p-3"
    >
      <h3 className="text-lg font-semibold mb-1">{feature?.title}</h3>
      <p >{feature?.description}</p>
    </div>
  );

  return (
    <section className="p-15 ">
      <h2 className="font-bubble text-5xl font-bold text-center mb-1 md:mb-6 lg:mb-10">
        About{" "}
        <span className="text-green-500 ml-1 hover:scale-110 transition-transform duration-200 font-bubble">
          Movie
        </span>
        <span className="ml-3 text-blue-500  hover:scale-110 transition-transform duration-200 font-bubble">
          VerSe
        </span>
      </h2>
      <div className="flex flex-col md:flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center justify-center">
        <div className="px-0 lg:px-20 pt-10">
          <p className="text-xl font-semibold max-w-xl">
            Your ultimate movie management companion. Designed for cinephiles
            and casual viewers alike,
            <span className="text-green-500 ml-1 hover:scale-110 transition-transform duration-200 font-bubble">
              Movie
            </span>
            <span className="ml-3 text-blue-500  hover:scale-110 transition-transform duration-200 font-bubble">
              VerSe
            </span>{" "}
            offers a comprehensive solution for organizing, discovering, and
            managing your movie collection with style and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-rows-2 gap-3 lg:max-w-xl lg:gap-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;

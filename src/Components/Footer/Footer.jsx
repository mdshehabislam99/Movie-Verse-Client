import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <>
      <footer className=" text-white backdrop-blur-lg bg-gray-800/80 text-center to-green-400 footers py-4">
        <div className="mx-auto ">
          <div className="text-center mb-3">
            <h1
              className="hover:underline text-2xl font-bold  transition-all
                  duration-500 transform hover:scale-105"
            >
              <Link to="/">
                <Logo></Logo>
              </Link>
            </h1>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2
           lg:grid-cols-3 gap-3 md:gap-0 lg:gap-3 "
          >
            {/* Nav links */}
            <div className="lg:mt-7 ">
              <h3
                className="text-lg 
              text-gray-400 font-semibold mb-2 "
              >
                Quick Links
              </h3>
              <ul className="space-y-2 font-medium ">
                <li>
                  <button
                    className="hover:text-amber-500 hover:underline  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <Link to="/">Home</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-amber-500 hover:underline  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <Link to="/all-movie">All Movies</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-amber-500 hover:underline  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <Link to="/my-collection">My Collection</Link>
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal  */}
            <div className="lg:mt-7 my-3 md:mt-0">
              <h3 className="text-lg text-gray-400 font-semibold mb-4 ">
                Legal
              </h3>
              <ul className="space-y-2 font-medium">
                <li>
                  <button
                    className="hover:text-amber-500 hover:underline  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-amber-500 hover:underline
                    transition-all duration-500 hover:scale-105"
                  >
                    <Link to="/terms-services">Terms of Services</Link>
                  </button>
                </li>
              </ul>
            </div>
            <div
              className="flex flex-col items-center md:col-span-2
             lg:col-span-1 lg:mt-7"
            >
              {/* Social Media Links*/}
              <h3 className="text-lg text-gray-400 font-semibold mb-4">
                Follow Us
              </h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a
                  href="https://www.facebook.com/"
                  className="text-sm gap-2
                 font-bold flex 
                   flex-col hover:text-amber-500  transition-all
                  duration-300 transform hover:scale-105"
                >
                  <span
                    className="hover:text-amber-500 w-14 hover:bg-amber-500  ml-2
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                  >
                    <SocialIcon url="https://www.facebook.com/"></SocialIcon>
                  </span>
                  <span className="lg:mt-2"> Facebook</span>
                </a>

                <a
                  href="https://x.com"
                  className=" text-sm gap-2
                 font-bold flex
                   flex-col hover:text-amber-500  transition-all
                  duration-300 transform hover:scale-105"
                >
                  <span
                    className="hover:text-amber-500 w-14 hover:bg-amber-500
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                  >
                    <SocialIcon url="https://x.com"></SocialIcon>
                  </span>
                  <span className="lg:mt-2">Twitter</span>
                </a>

                <a
                  href="https://github.com/shehabislam99"
                  className="text-sm gap-2
                 font-bold flex
                   flex-col hover:text-amber-500  transition-all
                  duration-300 transform hover:scale-105"
                >
                  <span
                    className="hover:text-amber-500 w-14 hover:bg-amber-500
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                  >
                    <SocialIcon url="https://github.com/shehabislam99"></SocialIcon>
                  </span>
                  <span className="lg:mt-2"> GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/"
                  className="text-sm gap-2
                 font-bold flex
                   flex-col hover:text-amber-500 transition-all
                  duration-300 transform hover:scale-105"
                >
                  <span
                    className="hover:text-amber-500 w-14 hover:bg-amber-500  
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                  >
                    <SocialIcon url="https://www.linkedin.com/"></SocialIcon>
                  </span>
                  <span className="lg:mt-2 "> LinkedIn </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex justify-center bg-amber-500 items-center p-4 font-semibold ">
        © {new Date().getFullYear()} MovieVerse Pro. All rights reserved.
      </div>
    </>
  );
};

export default Footer;

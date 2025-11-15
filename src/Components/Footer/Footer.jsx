import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-r from-pink-300 text-center to-green-400 footer px-4 py-6">
        <div className="mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-10 md:gap-1">
            {/* Nav links */}
            <div className="lg:mt-7 md:mt-17 text-white">
              <h3 className="text-lg font-semibold mb-2 ">Quick Links</h3>
              <ul className="space-y-2 font-medium ">
                <li>
                  <Link
                    to="/"
                    className="hover:text-amber-500 hover:underline "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-movie"
                    className="hover:text-amber-500 hover:underline "
                  >
                    All Movies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-collection"
                    className="hover:text-amber-500 hover:underline "
                  >
                    My Collection
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 md:-ml-8">
              <Link
                to="/"
                className="md:mt-5 hover:text-white hover:underline text-2xl font-bold text-white mb-4 md:mb-2 inline-block"
              >
                <Logo></Logo>
              </Link>
              <p className="font-semibold mb-4 max-w-sm text-white text-lg">
                Your ultimate movie management platform. Browse, organize, and
                discover your favorite films with advanced filtering and
                personal collections. Making movie nights magical while
                connecting cinephiles worldwide.
              </p>
            </div>

            {/* Legal  */}
            <div className="lg:mt-7  text-white">
              <h3 className="text-lg font-semibold mb-4 ">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-amber-500 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-services"
                    className="hover:text-amber-500 hover:underline "
                  >
                    Terms of Services
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex text-white  lg:flex-col lg:space-y-3 sm:justify-center space-x-4">
              {/* Social Media Links*/}

              <a
                href="https://www.facebook.com/"
                className="text-lg gap-2
                 font-bold flex 
                  lg:flex-row flex-col hover:text-amber-500 "
              >
                <span
                  className="hover:text-amber-500 w-14 hover:bg-amber-500 lg:ml-0 ml-3
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                >
                  <SocialIcon url="https://www.facebook.com/"></SocialIcon>
                </span>
                <span className="lg:mt-2 mr-2"> Facebook</span>
              </a>

              <a
                href="https://x.com"
                className=" text-lg gap-2
                 font-bold flex
                  lg:flex-row flex-col hover:text-amber-500"
              >
                <span
                  className="hover:text-amber-500 w-14 hover:bg-amber-500
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                >
                  <SocialIcon url="https://x.com"></SocialIcon>
                </span>
                <span className="lg:mt-2 mr-2">Twitter</span>
              </a>

              <a
                href="https://github.com/shehabislam99"
                className="text-lg gap-2
                 font-bold flex
                  lg:flex-row flex-col hover:text-amber-500 "
              >
                <span
                  className="hover:text-amber-500 w-14 hover:bg-amber-500
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                >
                  <SocialIcon url="https://github.com/shehabislam99"></SocialIcon>
                </span>
                <span className="lg:mt-2 mr-2"> GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/"
                className="text-lg gap-2
                 font-bold flex
                  lg:flex-row flex-col hover:text-amber-500"
              >
                <span
                  className="hover:text-amber-500 w-14 hover:bg-amber-500 lg:ml-0 ml-1
                   h-14 bg-blue-800 rounded-full flex items-center justify-center"
                >
                  <SocialIcon url="https://www.linkedin.com/"></SocialIcon>
                </span>
                <span className="lg:mt-2 "> LinkedIn </span>
              </a>
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

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo/Logo";
import { MdErrorOutline } from "react-icons/md";


const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-auto w-full text-center">
        <div className="mb-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div>
          <div className="relative inline-block">
            <div className=" flex items-center justify-center mx-auto mb-4">
              <MdErrorOutline className="w-50 h-50 text-red-700" />
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-amber-600 mb-8">
            The Movies you're looking for that's seems to not here! <br /> Don't
            worry, let's get back and search again.
          </p>
          <div className="inline gap-7">
            <Link
              to="/"
              className=" bg-green-600 text-white py-3 px-6 rounded-full
               font-semibold hover:bg-amber-500 "
            >
              Go Back to Home
            </Link>

            <Link
              to="/all-toys"
              className="ml-5 bg-red-800 text-white 
              py-3 px-6 rounded-full font-semibold hover:bg-amber-500"
            >
              Browse All Movies
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link
              to="/terms-services"
              className="text-green-600 hover:text-amber-500 font-medium"
            >
              Terms of Services
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

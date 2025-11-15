import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Errorpage from '../Pages/Error.jsx/Errorpage';
import Login from '../Pages/LogResAuth/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import Mainlayout from '../MainLayout/Mainlayout';
import Register from '../Pages/LogResAuth/Register';
import MyCollection from '../Pages/MyCollection/MyCollection';
import AllMovies from '../Pages/AllMoviesPage/AllMovies';
import AddMovies from '../Pages/AllMoviesPage/AddMovies';
import MovieDetails from '../Pages/AllMoviesPage/MovieDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/movie"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/all-movie",
        element: <AllMovies></AllMovies>,
        loader: () => fetch("http://localhost:3000/movie"),
      },
      {
        path: "/my-collection",
        element: <MyCollection></MyCollection>,
      },
      {
        path: "/add-movie",
        element: <AddMovies></AddMovies>,
      },
      {
        path: "/movie-details",
        element: <MovieDetails></MovieDetails>,
        loader: () => fetch("http://localhost:3000/movie"),
      },
    ],
  },
]);
export default router;
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
import MoviesByGenre from '../Pages/AllMoviesPage/MoviesByGenre';
import UpdateMovies from '../Pages/AllMoviesPage/UpdateMovies';
import PrivetRoute from '../Components/PrivetRout/PrivetRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
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
      },
      { path: "/genre/:genreName", element: <MoviesByGenre></MoviesByGenre> },
      {
        path: "/my-collection",
        element: (
          <PrivetRoute>
            <MyCollection></MyCollection>
          </PrivetRoute>
        ),
      },
      {
        path: "/add-movie",
        element: (
          <PrivetRoute>
            <AddMovies></AddMovies>
          </PrivetRoute>
        ),
      },
      {
        path: "/update-movie/:id",
        element: (
          <PrivetRoute>
            <UpdateMovies></UpdateMovies>
          </PrivetRoute>
        ),
      },
      {
        path: "/single-movie-details/:moviesId",
        element: <MovieDetails></MovieDetails>,
      },
    ],
  },
]);
export default router;
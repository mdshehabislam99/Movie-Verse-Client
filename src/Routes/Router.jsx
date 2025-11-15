import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Errorpage from '../Pages/Error.jsx/Errorpage';
import Login from '../Pages/LogResAuth/Login';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import Mainlayout from '../MainLayout/Mainlayout';
import Register from '../Pages/LogResAuth/Register';
import AllMovies from '../Pages/AllMovies/AllMovies';
import MyCollection from '../Pages/MyCollection/MyCollection';

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
        loader: () => fetch("http://localhost:3000/movie"),
      },
      {
        path: "my-collection",
        element: <MyCollection></MyCollection>,
      },
    ],
  },
]);
export default router;
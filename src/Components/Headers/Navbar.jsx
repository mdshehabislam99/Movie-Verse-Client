import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Provider/AuthProvider";
import Logo from "../Logo/Logo";
import { FaSearch } from "react-icons/fa";
import {
  HiOutlineMenuAlt1,
  HiMoon,
  HiSun,
  HiX,
} from "react-icons/hi";
import MenuSideBar from "./MenuSideBar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Successfully logged out!");
      })
      .catch((error) => {
        toast.error("Failed to logout: " + error.message);
      });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark");
  };


  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-movie", label: "All Movies" },
    { to: "/my-collection", label: "My Collection" },
  ];

  const links = (
    <>
      {navLinks.map((link, index) => (
        <li key={index}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `text-[16px] font-medium hover:text-amber-300 transition-colors duration-200 ${
                isActive ? "text-amber-400 font-medium underline" : "text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar px-6 md:px-12 justify-between py-3 fixed top-0 left-0 shadow-lg  w-full z-50 transition-all duration-300 bg-transparent">
        <div className="flex items-center">
          <div className="flex items-center">
            <button
              onClick={toggleDropdown}
              className="lg:hidden flex gap-2 items-center focus:outline-none mr-4"
            >
              <HiOutlineMenuAlt1 className="w-7 h-7 text-white" />
            </button>
            <div className="flex items-center ">
              <Logo />
            </div>
            <div className="ml-15 hidden lg:flex">
              <ul className="flex justify-between gap-8">{links}</ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-800 rounded-full px-4 py-2 w-64">
            <input
              type="text"
              placeholder="Search movies, shows..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
            />
          </div>
          <div className="lg:hidden md:hidden">
            <button className="mt-2 hover:text-amber-500">
              <FaSearch />
            </button>
          </div>

          <button
            placeholder="Search movies, shows..."
            className="text-white 
            hover:text-amber-300
             transition-colors duration-200 "
            title="Search"
          >
            Search
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-white hover:text-amber-300 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 hidden sm:block"
            title={
              isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {isDarkTheme ? (
              <HiSun className="w-6 h-6" />
            ) : (
              <HiMoon className="w-6 h-6" />
            )}
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/my-collection">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="user"
                  title={user.displayName || user.email}
                  className="w-10 h-10 rounded-full border-2 border-amber-500"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-amber-500 border-none rounded-full text-white hover:bg-amber-600 btn px-6 py-2 transition-colors duration-200 font-medium "
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-amber-500 border-none rounded-full text-white hover:bg-amber-600 btn px-6 py-2 transition-colors duration-200 font-medium ">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      <MenuSideBar
        links={navLinks}
        isOpen={isDropdownOpen}
        onClose={closeDropdown}
      />
    </>
  );
};

export default Navbar;

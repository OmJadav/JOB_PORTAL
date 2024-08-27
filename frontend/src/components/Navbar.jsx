import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWbSunny, MdOutlineDarkMode } from "react-icons/md";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isUserAuthenticated } = useSelector((state) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <nav className="mb-1 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-deepNavy dark:text-deepNavy">
            CareerLink
          </h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <button onClick={toggleDarkMode}>
            {!isDarkMode ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />}
          </button>
          <Link to="/" className="hover:text-deepNavy dark:hover:text-deepNavy">
            Home
          </Link>
          <Link
            to="/jobs"
            className="hover:text-deepNavy dark:hover:text-deepNavy"
          >
            Jobs
          </Link>

          {user?._id || isUserAuthenticated ? (
            <Link
              to="/dashboard"
              className="hover:text-deepNavy dark:hover:text-deepNavy"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-deepNavy dark:hover:text-deepNavy"
            >
              Login
            </Link>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>
      <div
        className={`md:hidden bg-white dark:bg-gray-900 text-black dark:text-white ${
          isOpen ? "block" : "hidden"
        } transition-all`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link
            to="/"
            onClick={toggleMenu}
            className="hover:text-deepNavy dark:hover:text-deepNavy"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            onClick={toggleMenu}
            className="hover:text-deepNavy dark:hover:text-deepNavy"
          >
            Jobs
          </Link>
          {isUserAuthenticated ? (
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="hover:text-deepNavy dark:hover:text-deepNavy"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="hover:text-deepNavy dark:hover:text-deepNavy"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

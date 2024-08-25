import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
export const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-300 py-16 px-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* <div className="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="logo" className="mb-6" />
          </div> */}
          <h1 className="text-2xl font-bold text-deepNavy dark:text-deepNavy">
            CareerLink
          </h1>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
              Support
            </h4>
            <ul className="space-y-2">
              <li>Ahmedabad, India</li>
              <li>careerLink@gmail.com</li>
              <li>+91 0011223344</li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/"} className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/jobs"} className="hover:underline">
                  Jobs
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to={"/dashboard"} className="hover:underline">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
              Follow Us
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <FaSquareXTwitter className="text-deepNavy dark:text-deepNavy" />
                  <span>Twitter (X)</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <FaSquareInstagram className="text-deepNavy dark:text-deepNavy" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <FaYoutube className="text-deepNavy dark:text-deepNavy" />
                  <span>Youtube</span>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <FaLinkedin className="text-deepNavy dark:text-deepNavy" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="bg-deepNavy dark:bg-black text-white py-4 text-center">
        &copy; CopyRight 2024. All Rights Reserved @
        <span className="underline cursor-pointer"> Om Jadav</span>
      </div>
    </>
  );
};

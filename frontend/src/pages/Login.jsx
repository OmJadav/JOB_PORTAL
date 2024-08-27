import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { login } from "../store/Slices/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userIdLocalStorage = localStorage.getItem("userId");

  const { user, loading, isUserAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };
  if (userIdLocalStorage) {
    navigateTo("/");
  }
  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deepNavy-hover via-purple-500 to-deepNavy">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden max-w-lg w-full transform transition-all duration-300 hover:scale-105">
          <div className="p-10">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
              Login
            </h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                  />
                  <MdOutlineMailOutline className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                  />
                  <RiLock2Fill className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-deepNavy text-white py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login
              </button>
              <div className="text-center mt-4">
                <Link
                  to="/register"
                  className="text-deepNavy dark:text-deepNavy-hover  font-medium text-lg hover:underline"
                >
                  Register Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

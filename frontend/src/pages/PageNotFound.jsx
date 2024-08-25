import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section className="flex items-center justify-center  bg-white dark:bg-gray-900 text-center">
      <div className="p-8 mx-auto max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-deepNavy dark:text-deepNavy mb-4">
          Page Not Found (404)
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          The page you visited could not be found. You may go back to the home
          page.
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-lg font-medium text-white bg-deepNavy hover:bg-deepNavy-hover rounded-md dark:bg-deepNavy dark:hover:bg-deepNavy-hover"
        >
          Back to Home Page
        </Link>
      </div>
    </section>
  );
};

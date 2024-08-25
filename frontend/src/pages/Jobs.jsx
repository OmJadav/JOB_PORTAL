import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchJobs } from "../store/Slices/jobSlice";
import { Spinner } from "../common/Spinner";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ConvertDate from "../common/DateConverter";
import {
  locations as cities,
  nichesArray as nichesArrays,
} from "../common/Location_niches";

export const Jobs = () => {
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const locations = cities();
  const nichesArray = nichesArrays();
  const { jobs, loading } = useSelector((state) => state.jobs);

  const handleCityChange = (location) => {
    setLocation(location);
    setSelectedLocation(location);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs(location, niche, searchKeyword));
  }, [dispatch, location, niche, searchKeyword]);

  const handleSearch = () => {
    dispatch(fetchJobs(location, niche, searchKeyword));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
          <div className="container mx-auto px-4 lg:px-5">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-2 mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center mb-4 lg:mb-0">
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 px-4 py-2.5 text-center bg-deepNavy text-white rounded-md text-sm font-medium hover:bg-deepNavy-hover transition-all duration-200 ease-in-out"
                >
                  <FaSearch className="inline-block mr-1" />
                </button>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                >
                  <option value="">Filter By Location</option>
                  {locations.map((loc, index) => (
                    <option value={loc} key={index}>
                      {loc}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-4">
                    {job.hiringMultipleCandidates === "Yes" ? (
                      <span className="bg-green-100 text-green-800 text-sm font-semibold py-1 px-2 rounded-md">
                        Hiring Multiple Candidates
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-sm font-semibold py-1 px-2 rounded-md">
                        Hiring
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-deepNavy dark:text-deepNavy mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Company:</span>{" "}
                    {job.companyName}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Salary:</span> ₹{" "}
                    {job.salary}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Posted On:</span>{" "}
                    {ConvertDate(job.jobPostedOn)}
                  </p>
                  <Link
                    to={`/post/application/${job._id}`}
                    className="inline-block px-6 py-3 bg-deepNavy text-white rounded-md hover:bg-deepNavy-hover transition"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

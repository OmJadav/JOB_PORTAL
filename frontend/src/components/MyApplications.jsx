import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import {
  deleteApplication,
  fetchAllJobSeekerApplications,
  resetApplicationSlice,
} from "../store/Slices/applicationSlice";

export const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      dispatch(resetApplicationSlice());
      dispatch(fetchAllJobSeekerApplications());
    }
  }, [dispatch, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications?.applications?.length <= 0 ? (
        <h1 className="p-6 bg-white  rounded-lg shadow-md text-lg font-semibold text-gray-900 dark:text-gray-100">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="min-h-screen py-1 bg-gray-100 dark:bg-gray-900 sm:py-2">
          <div className="container mx-auto px-0 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications?.applications?.map((element) => (
                <div
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition relative"
                  key={element._id}
                >
                  <div className="mb-4">
                    <div className="bg-red-200 rounded-lg px-2 ">
                      {element.deletedBy.employer && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <span className="font-semibold">Deleted By :</span>{" "}
                          Company
                        </p>
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-semibold">Job Title:</span>{" "}
                      {element.jobInfo.jobTitle}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-semibold">Name:</span>{" "}
                      {element.jobSeekerInfo.name}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {element.jobSeekerInfo.email}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-semibold">Phone:</span>{" "}
                      {element.jobSeekerInfo.phone}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-semibold">Address:</span>{" "}
                      {element.jobSeekerInfo.address}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Cover Letter:</span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      ></textarea>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:bg-red-300"
                      onClick={() => handleDeleteApplication(element._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={
                        element.jobSeekerInfo &&
                        element.jobSeekerInfo.resume.url
                      }
                      className="px-4 ml-1 py-2 bg-deepNavy text-white rounded-md hover:bg-deepNavy-hover transition"
                      target="_blank"
                    >
                      View Resume
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

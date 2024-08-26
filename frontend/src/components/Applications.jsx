import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteApplication,
  fetchAllEmployerApplications,
  resetApplicationSlice,
} from "../store/Slices/applicationSlice";
import { Spinner } from "../common/Spinner";

export const Applications = () => {
  const { applications, loading, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchAllEmployerApplications());
  }, [dispatch, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };
  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {loading ? (
          <Spinner />
        ) : applications && applications?.applications?.length <= 0 ? (
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            You have no applications from job seekers.
          </h1>
        ) : (
          <>
            <div className="space-y-6">
              {applications?.applications?.map((application, index) => (
                <div
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                  key={application._id}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Application Number :</span>{" "}
                    {index + 1}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Job Title:</span>{" "}
                    {application.jobInfo.jobTitle}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Applicant's Name:</span>{" "}
                    {application.jobSeekerInfo.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Applicant's Email:</span>{" "}
                    {application.jobSeekerInfo.email}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Applicant's Phone:</span>{" "}
                    {application.jobSeekerInfo.phone}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Applicant's Address:</span>{" "}
                    {application.jobSeekerInfo.address}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    <span className="font-semibold">
                      Applicant's Cover Letter:
                    </span>
                    <textarea
                      value={application.jobSeekerInfo.coverLetter}
                      rows={5}
                      disabled
                      className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    ></textarea>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 mt-2">
                      <span className="font-semibold">Applicant's Resume:</span>{" "}
                      {application.jobSeekerInfo.resume?.url && (
                        <Link
                          to={application.jobSeekerInfo.resume.url}
                          className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                          target="_blank"
                        >
                          View Resume
                        </Link>
                      )}
                    </p>
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:bg-red-300"
                      onClick={() => handleDeleteApplication(application._id)}
                    >
                      Delete Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

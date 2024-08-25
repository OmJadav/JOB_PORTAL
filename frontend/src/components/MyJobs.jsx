import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetJobSlice,
  deleteJob,
  fetchMyJobs,
} from "../store/Slices/jobSlice";
import { Spinner } from "../common/Spinner";

export const MyJobs = () => {
  const { loading, myJobs, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      dispatch(resetJobSlice());
    }
    dispatch(fetchMyJobs());
    // console.log(myJobs);
  }, [dispatch, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs?.myJobs?.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not posted any job!
        </h1>
      ) : (
        <>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="space-y-6">
              {myJobs?.myJobs?.map((job) => (
                <div
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                  key={job._id}
                >
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    <span className="font-semibold">Job Title:</span>{" "}
                    {job.title}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Job Niche:</span>{" "}
                    {job.jobNiche}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Salary:</span> {job.salary}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Job Type:</span>{" "}
                    {job.jobType}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Company Name:</span>{" "}
                    {job.companyName}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Introduction:</span>{" "}
                    {job.introduction}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Qualifications:</span>{" "}
                    {job.qualifications}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Responsibilities:</span>{" "}
                    {job.responsibilities}
                  </p>
                  {job.offers && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      <span className="font-semibold">
                        What Are We Offering:
                      </span>{" "}
                      {job.offers}
                    </p>
                  )}
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:bg-red-300"
                    onClick={() => handleDeleteJob(job._id)}
                  >
                    Delete Job
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

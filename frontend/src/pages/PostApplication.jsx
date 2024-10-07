import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { postApplication } from "../store/Slices/applicationSlice";
import { fetchSingleJob } from "../store/Slices/jobSlice";
import { MdOutlineMail } from "react-icons/md";
import ConvertDate from "../common/DateConverter";
import { CgDanger } from "react-icons/cg";

export const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isUserAuthenticated, user } = useSelector((state) => state.user);
  const { loading, message } = useSelector((state) => state.applications);

  const { jobId } = useParams();
  const userIdLocalStorage = localStorage.getItem("userId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user?.user?.name || "");
      setEmail(user?.user?.email || "");
      setPhone(user?.user?.phone || "");
      setAddress(user?.user?.address || "");
      setCoverLetter(user?.user?.coverLetter || "");
      setResume((user?.user?.resume && user?.user?.resume.url) || "");
    }

    dispatch(fetchSingleJob(jobId));
  }, [dispatch, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let benefits = [];
  if (singleJob?.qualifications) {
    qualifications = singleJob?.qualifications.split(", " || ".");
  }
  if (singleJob?.responsibilities) {
    responsibilities = singleJob?.responsibilities.split(", " || ".");
  }
  if (singleJob?.benefits) {
    benefits = singleJob?.benefits.split(", " || ".");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };
  return (
    <>
      <article className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="mt-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
          <header className="mb-4 flex justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {singleJob?.title}
              </h3>
              Website :{" "}
              {singleJob?.personalWebsite && (
                <Link
                  to={singleJob?.personalWebsite}
                  className="text-blue-500 dark:text-blue-400"
                  target="_blank"
                >
                  {singleJob?.personalWebsite}
                </Link>
              )}
              <p className="text-gray-700 dark:text-gray-300">
                {singleJob?.location}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Rs. {singleJob?.salary}
              </p>
            </div>
          </header>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
          <section>
            <div className="space-y-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Job Details
              </h3>
              <div className="flex items-center space-x-2">
                <IoMdCash className="text-gray-500 dark:text-gray-400" />
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Pay:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {singleJob?.salary}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaToolbox className="text-gray-500 dark:text-gray-400" />
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Job Type:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {singleJob?.jobType}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MdOutlineMail className="text-gray-500 dark:text-gray-400" />

                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Contact Email :{" "}
                  </span>
                  <span className="text-blue-500 dark:text-gray-100">
                    {singleJob?.contactEmail}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CgDanger className="text-gray-500 dark:text-gray-400" />

                <div className="bg-red-300  text-red-800 text-lg font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Application Deadline :{" "}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    11:59 PM {"  "}{" "}
                    {ConvertDate(singleJob?.applicationDeadline)}
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="space-y-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Location
              </h3>
              <div className="flex items-center space-x-2">
                <FaLocationDot className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">
                  {singleJob?.location}
                </span>
              </div>
            </div>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Full Job Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {singleJob?.jobDescription}
              </p>
              {singleJob?.qualifications && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Qualifications
                  </h4>
                  <ul className="list-disc pl-5">
                    {qualifications?.map((element) => (
                      <li
                        key={element}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob?.responsibilities && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Responsibilities
                  </h4>
                  <ul className="list-disc pl-5">
                    {responsibilities?.map((element) => (
                      <li
                        key={element}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob?.benefits && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Offering
                  </h4>
                  <ul className="list-disc pl-5">
                    {benefits?.map((element) => (
                      <li
                        key={element}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
          <footer>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Job Niche
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {singleJob?.jobNiche}
            </p>
          </footer>
        </div>
        <form className="space-y-6 mt-5">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Application Form for Applying
          </h3>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Job Title
            </label>
            <input
              type="text"
              placeholder={singleJob?.title}
              disabled
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
          </div>
          {user && user?.user?.role === "job seeker" && (
            <>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  {user?.user?.resume
                    ? `Resume : You have already uploaded.Update if you want.`
                    : "Resume"}{" "}
                  {user?.user?.resume?.url && (
                    <a
                      href={user?.user?.resume.url}
                      target="_blank"
                      className="underline text-blue-700"
                    >
                      {" "}
                      view
                    </a>
                  )}
                </label>
                <p className="text-red-600 text-sm">
                  **something went wrong with your saved resume please do upload
                  resume for no errors**
                </p>
                <input
                  type="file"
                  onChange={resumeHandler}
                  className="block w-full text-sm text-gray-500 dark:text-gray-400"
                />
              </div>
            </>
          )}

          {isUserAuthenticated && user?.user?.role === "job seeker" && (
            <div className="flex justify-center ">
              <button
                className="bg-deepNavy w-screen text-white py-2 px-4 rounded-md hover:bg-deepNavy-hover disabled:bg-blue-300"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply For Job
              </button>
            </div>
          )}
          {!userIdLocalStorage && (
            <button disabled>
              <p className="inline-block px-6 py-3 w-screen  bg-red-500 text-white rounded-md transition">
                Please Login for Apply
              </p>
            </button>
          )}
          {user.user && user?.user?.role !== "job seeker" && (
            <button disabled>
              <p className="inline-block px-6 py-3 w-screen  bg-red-500 text-white rounded-md transition">
                You can not apply as a Employer
              </p>
            </button>
          )}
        </form>
      </article>
    </>
  );
};

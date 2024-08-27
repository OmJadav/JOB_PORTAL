import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import { postNewJob, resetJobSlice } from "../store/Slices/jobSlice";
import { locations, nichesArray } from "../common/Location_niches";
export const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("contactEmail", contactEmail);
    formData.append("jobDescription", jobDescription);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    benefits && formData.append("benefits", benefits);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsite && formData.append("personalWebsite", personalWebsite);
    dispatch(postNewJob(formData));
  };
  const cities = locations();
  const nichesArrays = nichesArray();
  useEffect(() => {
    if (message) {
      dispatch(resetJobSlice());
    }
  }, [dispatch, loading, message]);
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-600"> *</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Job Type<span className="text-red-600"> *</span>
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Location (City)<span className="text-red-600"> *</span>
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Company Name<span className="text-red-600"> *</span>
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Contact Email<span className="text-red-600"> *</span>
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Company/Job Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Company/Job Description<span className="text-red-600"> *</span>
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Company / Job Description"
            rows={7}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Responsibilities<span className="text-red-600"> *</span>
          </label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="Job Responsibilities"
            rows={7}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Qualifications<span className="text-red-600"> *</span>
          </label>
          <textarea
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Required Qualifications For Job"
            rows={7}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Benefits */}
        <div>
          <div className="flex items-center  mb-1">
            <label className="text-gray-700 dark:text-gray-300">
              What We Offer
            </label>
            <span className="text-gray-500 ml-2 dark:text-gray-400 flex items-center">
              <CiCircleInfo className="mr-1" /> Optional
            </span>
          </div>
          <textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="What are the benefits!"
            rows={7}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Job Niche */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Job Niche<span className="text-red-600"> *</span>
          </label>
          <select
            value={jobNiche}
            onChange={(e) => setJobNiche(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Select Job Niche</option>
            {nichesArrays.map((niche, index) => (
              <option key={index} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Salary<span className="text-red-600"> *</span>
          </label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="50000 - 800000"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {/* Hiring Multiple Candidates */}
        <div>
          <div className="flex items-center  mb-1">
            <label className="text-gray-700 dark:text-gray-300">
              Hiring Multiple Candidates?
            </label>
            <span className="text-gray-500 ml-2 dark:text-gray-400 flex items-center">
              <CiCircleInfo className="mr-1" /> Optional
            </span>
          </div>
          <select
            value={hiringMultipleCandidates}
            onChange={(e) => setHiringMultipleCandidates(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          >
            <option value="">Hiring Multiple Candidates?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Personal Website */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-gray-700 dark:text-gray-300">
              Personal Website<span className="text-red-600"> *</span>
            </label>
          </div>
          <input
            type="text"
            value={personalWebsite}
            onChange={(e) => setPersonalWebsite(e.target.value)}
            placeholder="Personal Website"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Post Job Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="bg-deepNavy text-white py-2 px-4 rounded-md hover:bg-deepNavy-hover disabled:bg-blue-300"
          onClick={handlePostJob}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

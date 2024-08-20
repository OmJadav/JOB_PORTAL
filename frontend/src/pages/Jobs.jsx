import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchJobs } from "../store/Slices/jobSlice";
import { Spinner } from "../common/Spinner";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ConvertDate from "../common/DateConverter";

export const Jobs = () => {
  const [location, setLocation] = useState("");
  const [selectedLocation, setselectedLocation] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const locations = ["Chennai", "Bengaluru", "Mumbai"];

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const { jobs, loading } = useSelector((state) => state.jobs);

  const handleCityChange = (location) => {
    setLocation(location);
    setselectedLocation(location);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs(location, niche, searchKeyword));
  }, [dispatch, location, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(location, niche, searchKeyword));
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By Location</h2>
                {locations.map((location, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={location}
                      name="location"
                      value={location}
                      checked={selectedLocation === location}
                      onChange={() => handleCityChange(location)}
                    />
                    <label htmlFor={location}>{location}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Filter By Location</option>
                  {locations.map((location, index) => (
                    <option value={location} key={index}>
                      {location}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs &&
                  jobs.map((element) => {
                    return (
                      <div className="card" key={element._id}>
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="hiring-multiple">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="hiring">Hiring</p>
                        )}
                        <p className="title">{element.title}</p>
                        <p className="company">{element.companyName}</p>
                        <p className="location">{element.location}</p>
                        <p className="salary">
                          <span>Salary:</span> ₹ {element.salary}
                        </p>
                        <p className="posted">
                          <span>Posted On:</span>{" "}
                          {ConvertDate(element.jobPostedOn)}
                        </p>
                        <div className="btn-wrapper">
                          <Link
                            className="btn"
                            to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

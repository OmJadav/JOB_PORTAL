import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { postApplication } from "../store/Slices/applicationSlice";
import { fetchSingleJob } from "../store/Slices/jobSlice";

export const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isUserAuthenticated, user } = useSelector((state) => state.user);
  const { loading, message } = useSelector((state) => state.applications);

  // console.log(singleJob);
  // console.log(user);

  const { jobId } = useParams();

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
      <article className="application_page">
        <form>
          <h3>Application Form</h3>
          <div>
            <label>Job Title</label>
            <input type="text" placeholder={singleJob?.title} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {user && user?.user?.role === "job seeker" && (
            <>
              <div>
                <label>Coverletter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                />
              </div>
              <div>
                <label>Resume</label>
                <input type="file" onChange={resumeHandler} />
              </div>
            </>
          )}

          {isUserAuthenticated && user?.user?.role === "job seeker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>

        <div className="job-details">
          <header>
            <h3>{singleJob?.title}</h3>
            {singleJob?.personalWebsite && (
              <Link target="_blank" to={singleJob?.personalWebsite}>
                {singleJob?.personalWebsite}
              </Link>
            )}
            <p>{singleJob?.location}</p>
            <p>Rs. {singleJob?.salary} </p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Job details</h3>
              <div>
                <IoMdCash />
                <div>
                  <span>Pay</span>
                  <span>{singleJob?.salary} </span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Job type</span>
                  <span>{singleJob?.jobType}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Location</h3>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJob?.location}</span>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJob?.jobDescription}</p>
              {singleJob?.qualifications && (
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {qualifications?.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob?.responsibilities && (
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities?.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob?.benefits && (
                <div>
                  <h4>Offering</h4>
                  <ul>
                    {benefits?.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Niche</h3>
            <p>{singleJob?.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

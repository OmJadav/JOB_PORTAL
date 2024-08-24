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
      {loading ? (
        <Spinner />
      ) : applications && applications?.applications?.length <= 0 ? (
        <h1>You have no applications from job seekers.</h1>
      ) : (
        <>
          <div className="account_components">
            <h3>Applications For Your Posted Jobs</h3>
            <div className="applications_container">
              {applications?.applications?.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p className="sub-sec">
                      <span>Job Title: </span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Name: </span>{" "}
                      {element.jobSeekerInfo.name}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Email:</span>{" "}
                      {element.jobSeekerInfo.email}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Phone: </span>{" "}
                      {element.jobSeekerInfo.phone}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's Address: </span>{" "}
                      {element.jobSeekerInfo.address}
                    </p>
                    <p className="sub-sec">
                      <span>Applicant's CoverLetter: </span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                      ></textarea>
                    </p>
                    <div className="btn-wrapper">
                      <button
                        className="outline_btn"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        className="btn"
                        target="_blank"
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

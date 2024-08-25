import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { nichesArray as nichesArrays } from "../common/Location_niches";
import { fetchLoggedInUser } from "../store/Slices/userSlice";
import {
  resetProfileAfterUpdate,
  updateProfile,
} from "../store/Slices/updateProfileSlice";
export const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated } = useSelector((state) => state.updateProfile);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user && user?.user?.name);
  const [email, setEmail] = useState(user && user?.user?.email);
  const [phone, setPhone] = useState(user && user?.user?.phone);
  const [address, setAddress] = useState(user && user?.user?.address);
  const [coverLetter, setCoverLetter] = useState(
    user && user?.user?.coverLetter
  );
  const [firstNiche, setFirstNiche] = useState(
    user && user?.user?.niches?.firstNiche
  );
  const [secondNiche, setSecondNiche] = useState(
    user && user?.user?.niches?.secondNiche
  );
  const [thirdNiche, setThirdNiche] = useState(
    user && user?.user?.niches?.thirdNiche
  );
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(
    user && user?.user?.resume?.url
  );

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user?.user?.role === "job seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(fetchLoggedInUser());
      dispatch(resetProfileAfterUpdate());
    }
  }, [dispatch, isUpdated]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const nichesArray = nichesArrays();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        {user?.user?.role === "job seeker" && (
          <>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                My Preferred Job Niches
              </label>
              <div className="space-y-2">
                <select
                  value={firstNiche}
                  onChange={(e) => setFirstNiche(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {nichesArray.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </select>
                <select
                  value={secondNiche}
                  onChange={(e) => setSecondNiche(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {nichesArray.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </select>
                <select
                  value={thirdNiche}
                  onChange={(e) => setThirdNiche(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  {nichesArray.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Upload Resume
              </label>
              <input
                type="file"
                onChange={resumeHandler}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
              {user?.user?.resume && (
                <div className="mt-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Current Resume:
                  </p>
                  <Link
                    to={user?.user?.resume.url}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    View Resume
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="bg-deepNavy text-white py-2 px-4 rounded-md hover:bg-deepNavy-hover disabled:bg-blue-300"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

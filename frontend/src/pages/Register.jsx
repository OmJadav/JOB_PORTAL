import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { register } from "../store/Slices/userSlice";
export const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

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

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isUserAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "job seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      navigateTo("/login");
    }
  }, [dispatch, isUserAuthenticated, message]);

  return (
    <>
      <section className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-deepNavy-hover via-purple-500 to-deepNavy">
        <div className="bg-white mt-5 mb-5 dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden max-w-2xl w-full transform transition-all duration-300 ">
          <div className="p-5 ">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
              Create a New Account
            </h3>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="inputTag">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Register As
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    >
                      <option value="">Select Role</option>
                      <option value="employer">Register as an Employer</option>
                      <option value="job seeker">
                        Register as a Job Seeker
                      </option>
                    </select>
                    <FaRegUser className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                  </div>
                </div>
                <div className="inputTag">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                    <FaPencilAlt className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="inputTag">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                    <input
                      type="email"
                      placeholder="youremail@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                    <MdOutlineMailOutline className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                  </div>
                </div>
                <div className="inputTag">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                    <input
                      type="number"
                      placeholder="111-222-333"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                    <FaPhoneFlip className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="inputTag">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                    <input
                      type="text"
                      placeholder="Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                    <FaAddressBook className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                  </div>
                </div>
                <div className="inputTag">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                    <input
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                    />
                    <RiLock2Fill className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                  </div>
                </div>
              </div>
              {role === "job seeker" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="inputTag">
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                        Your First Niche
                      </label>
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                        <select
                          value={firstNiche}
                          onChange={(e) => setFirstNiche(e.target.value)}
                          className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                        >
                          <option value="">Your Niche</option>
                          {nichesArray.map((niche, index) => (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          ))}
                        </select>
                        <MdCategory className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                      </div>
                    </div>
                    <div className="inputTag">
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                        Your Second Niche
                      </label>
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                        <select
                          value={secondNiche}
                          onChange={(e) => setSecondNiche(e.target.value)}
                          className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                        >
                          <option value="">Your Niche</option>
                          {nichesArray.map((niche, index) => (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          ))}
                        </select>
                        <MdCategory className="text-deepNavy dark:text-deepNavy-hover mx-4" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="inputTag">
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                        Cover Letter
                      </label>
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                        <textarea
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={5}
                          className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="inputTag">
                      <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                        Resume
                      </label>
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400">
                        <input
                          type="file"
                          onChange={resumeHandler}
                          className="w-full px-4 py-3 text-gray-900 dark:text-white bg-transparent focus:outline-none"
                          style={{ border: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-deepNavy dark:bg-deepNavy hover:bg-deepNavy-hover dark:hover:bg-deepNavy-hover text-white font-bold py-3 px-6 rounded-full transition duration-300"
                >
                  Register
                </button>
                <Link
                  to={"/login"}
                  className="block text-deepNavy dark:text-deepNavy mt-4 underline"
                >
                  Login Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

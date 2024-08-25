import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/Slices/userSlice";
import { MyProfile } from "../components/MyProfile";
import { UpdateProfile } from "../components/UpdateProfile";
import { UpdatePassword } from "../components/UpdatePassword";
import { JobPost } from "../components/JobPost";
import { Applications } from "../components/Applications";
import { MyApplications } from "../components/MyApplications";
import { MyJobs } from "../components/MyJobs";
import { CgProfile } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import { LuMoveRight, LuMoveLeft } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEdit, FaBriefcase } from "react-icons/fa";
import { IoIosAddCircle, IoIosDocument } from "react-icons/io";

export const Dashboard = () => {
  const [componentName, setComponentName] = useState("My Profile");
  const [showSidebar, setShowSidebar] = useState(false);

  const { loading, isUserAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigateTo("/");
  };

  useEffect(() => {
    if (!isUserAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isUserAuthenticated]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`transition-transform duration-300 ease-in-out ${
          showSidebar ? "w-64" : "w-12"
        } bg-white dark:bg-gray-800 shadow-md`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2
            className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${
              showSidebar ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h2>
          <div>
            {showSidebar ? (
              <LuMoveLeft
                onClick={() => setShowSidebar(!showSidebar)}
                className={`text-xl cursor-pointer ${
                  showSidebar ? "ml-auto" : "mr-auto"
                }`}
              />
            ) : (
              <LuMoveRight
                onClick={() => setShowSidebar(!showSidebar)}
                className={`text-xl cursor-pointer ${
                  showSidebar ? "ml-auto" : "mr-auto"
                }`}
              />
            )}
          </div>
        </div>
        <ul className="mt-4">
          <li>
            <button
              className={`w-full text-left p-4 ${
                componentName === "My Profile"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => setComponentName("My Profile")}
            >
              {showSidebar ? "My Profile" : <CgProfile />}
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-4 ${
                componentName === "Update Profile"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => setComponentName("Update Profile")}
            >
              {showSidebar ? "Update Profile" : <FaEdit />}
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-4 ${
                componentName === "Update Password"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => setComponentName("Update Password")}
            >
              {showSidebar ? "Update Password" : <RiLockPasswordFill />}
            </button>
          </li>
          {user && user?.user?.role === "employer" && (
            <>
              <li>
                <button
                  className={`w-full text-left p-4 ${
                    componentName === "Post New Job"
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setComponentName("Post New Job")}
                >
                  {showSidebar ? "Post New Job" : <IoIosAddCircle />}
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-4 ${
                    componentName === "My Jobs"
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setComponentName("My Jobs")}
                >
                  {showSidebar ? "My Jobs" : <FaBriefcase />}
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-4 ${
                    componentName === "Applications"
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => setComponentName("Applications")}
                >
                  {showSidebar ? "Applications" : <IoIosDocument />}
                </button>
              </li>
            </>
          )}
          {user && user?.user?.role === "job seeker" && (
            <li>
              <button
                className={`w-full text-left p-4 ${
                  componentName === "My Applications"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                }`}
                onClick={() => setComponentName("My Applications")}
              >
                {showSidebar ? "My Applications" : <IoIosDocument />}
              </button>
            </li>
          )}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left p-4 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800"
            >
              {showSidebar ? "Logout" : <GrLogout />}
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-1 md:p-5">
        <div className="flex items-center justify-between mb-1 border-b border-gray-200 dark:border-gray-700 sm:mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {componentName}
          </h1>
        </div>
        {(() => {
          switch (componentName) {
            case "My Profile":
              return <MyProfile />;
            case "Update Profile":
              return <UpdateProfile />;
            case "Update Password":
              return <UpdatePassword />;
            case "Post New Job":
              return <JobPost />;
            case "My Jobs":
              return <MyJobs />;
            case "Applications":
              return <Applications />;
            case "My Applications":
              return <MyApplications />;
            default:
              return <MyProfile />;
          }
        })()}
      </div>
    </div>
  );
};

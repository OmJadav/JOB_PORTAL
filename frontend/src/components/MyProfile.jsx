import React from "react";
import { useSelector } from "react-redux";
import ConvertDate from "../common/DateConverter";

export const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md ">
      {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        My Profile
      </h3> */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            disabled
            value={user?.user?.name || ""}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={user?.user?.email || ""}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        {user?.user?.role === "job seeker" && (
          <div>
            <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
              My Preferred Job Niches
            </label>
            <div className="space-y-2">
              {["firstNiche", "secondNiche", "thirdNiche"].map(
                (niche, index) => (
                  <input
                    key={index}
                    type="text"
                    disabled
                    value={user?.user?.niches[niche] || ""}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                )
              )}
            </div>
          </div>
        )}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="number"
            disabled
            value={user?.user?.phone || ""}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            Address
          </label>
          <input
            type="text"
            disabled
            value={user?.user?.address || ""}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            Role
          </label>
          <input
            type="text"
            disabled
            value={user?.user?.role || ""}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            Joined On
          </label>
          <input
            type="text"
            disabled
            value={ConvertDate(user?.user?.createdAt) || ""}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

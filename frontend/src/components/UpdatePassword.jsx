import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { updatePassword } from "../store/Slices/updateProfileSlice";
import { fetchLoggedInUser } from "../store/Slices/userSlice";
export const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };
  useEffect(() => {
    if (isUpdated) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch, loading, isUpdated]);
  return (
    <>
      {/* <div className="account_components update_password_component">
        <h3>Update Password</h3>

        <div>
          <label>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div className="save_change_btn_wrapper">
          <button
            className="btn"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            Update Password
          </button>
        </div>
      </div> */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
        {/* New Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-deepNavy text-white py-2 px-4 rounded-md hover:bg-deepNavy-hover disabled:bg-blue-300"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            Update Password
          </button>
        </div>
      </div>
    </>
  );
};

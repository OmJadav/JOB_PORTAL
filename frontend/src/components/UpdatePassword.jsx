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
      <div className="account_components update_password_component">
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
      </div>
    </>
  );
};

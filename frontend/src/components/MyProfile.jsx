import React from "react";
import { useSelector } from "react-redux";
import ConvertDate from "../common/DateConverter";
export const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  return (
    <div className="account_components">
      <h3>My Profile</h3>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          disabled
          value={user && user?.user?.name}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          disabled
          value={user && user?.user?.email}
          onChange={(e) => e.target.value}
        />
      </div>
      {user && user?.user?.role === "job seeker" && (
        <div>
          <label>My Preferred Job Niches</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              disabled
              value={user && user?.user?.niches.firstNiche}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user?.user?.niches.secondNiche}
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              disabled
              value={user && user?.user?.niches.thirdNiche}
              onChange={(e) => e.target.value}
            />
          </div>
        </div>
      )}
      <div>
        <label>Phone Number</label>
        <input
          type="number"
          disabled
          value={user && user?.user?.phone}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          disabled
          value={user && user?.user?.address}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Role</label>
        <input
          type="text"
          disabled
          value={user && user?.user?.role}
          onChange={(e) => e.target.value}
        />
      </div>
      <div>
        <label>Joined On</label>
        <input
          type="text"
          disabled
          value={user && ConvertDate(user?.user?.createdAt)}
          onChange={(e) => e.target.value}
        />
      </div>
    </div>
  );
};

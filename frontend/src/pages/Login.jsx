import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { login } from "../store/Slices/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isUserAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };
  useEffect(() => {
    if (isUserAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isUserAuthenticated]);
  return (
    <>
      <section className="authPage">
        <div className="container login-container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" disabled={loading}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

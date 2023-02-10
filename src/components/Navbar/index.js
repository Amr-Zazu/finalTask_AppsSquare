import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { useNavigate } from "react-router-dom";
import {
  logout,
  setEmail,
  setPhone,
  // setProfileImage,
  setToken,
  setUserName,
} from "../../rtk/slices/register-slice";
// import { useAuth } from "../auth";
// import { useAuth } from "./auth";
import "./style.css";

const Navbar = () => {
  // const auth = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.register.isLogin);

  const [loading, setLoading] = useState(false);

  const apiLink = "https://bahar.appssquare.com/api/admin/logout";
  const token = useSelector((state) => state.register.token);

  const handleLogout = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(apiLink, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("register");
        localStorage.removeItem("recent-image");
        dispatch(logout());
        setLoading(false);
        dispatch(setToken(""));
        dispatch(setEmail(""));
        dispatch(setUserName(""));
        dispatch(setPhone(""));
        if (!loading) {
          navigate("/");
        }
      });
  };

  return (
    <div className="navbar-container ">
      <nav className="navbar navbar-expand-lg bg-body-tertiary container">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-light fs-4 fw-bold">
            dash
            <span style={{ color: "#ffa405" }} className="fw-bold">
              Board
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              backgroundColor: "white",
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link
                to="/"
                className="nav-link active text-light fs-6 fw-bold"
                aria-current="page"
              >
                Home
              </Link>
              <Link to="profile" className="nav-link text-light fs-6 fw-bold">
                Profile
                {isLogin ? (
                  localStorage.getItem("recent-image") ? (
                    <img
                      className="nav-image"
                      src={`${localStorage.getItem("recent-image")}`}
                      alt=""
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </Link>
              <Link to="packages" className="nav-link text-light fs-6 fw-bold">
                Table
              </Link>
              {/* <Link to="/profile" className="nav-link ms-0">
         
              </Link> */}

              {!isLogin ? (
                <Link to="/login" className="nav-link text-light fs-6 fw-bold">
                  Login
                </Link>
              ) : (
                <Link
                  to="/"
                  className="nav-link text-light fs-6 fw-bold"
                  onClick={handleLogout}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Logout"
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import image from "./../../images/2.jpg";
// import { useAuth } from "../auth";
import {
  login,
  setToken,
  setUserName,
  setEmail,
  setPhone,
  setProfileImage,
} from "../../rtk/slices/register-slice";

const Login = () => {
  const [inputEmail, setinputEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // const [store, setStore] = useState("");

  // const isLogin = useSelector((state) => state.register.isLogin);

  const dispatch = useDispatch();

  // const token = useSelector((state) => state.register.token);

  const navigate = useNavigate();
  const location = useLocation();
  // const auth = useAuth();

  const redirectPath = location.state?.path || "/";

  const apiLink = "https://bahar.appssquare.com/api/admin/login";

  const handleLogin = (e) => {
    // auth.login(email);
    setLoading(true);
    e.preventDefault();
    fetch(apiLink, {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === true) {
          localStorage.setItem(
            "register",
            JSON.stringify({
              login: true,
              token: data.token,
              email: data.data.email,
              phone: data.data.phone,
              name: data.data.name,
            })
          );
          dispatch(login());
          setLoading(false);
          dispatch(setToken(data.token));
          dispatch(setEmail(data.data.email));
          dispatch(setUserName(data.data.name));
          dispatch(setPhone(data.data.phone));
          if (!loading) {
            navigate(redirectPath, { replace: true });
          }
        } else {
          console.log(data.message);
          document.querySelector(
            ".error-message"
          ).innerHTML = `Your email & password don\`t match, Please try again`;
          document.querySelector(".error-message").style.display = "block";
          setLoading(false);
        }

        // console.log(data.data.name);
      });
    // .catch((err) => {
    //   console.log(err.message);
    // });
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="image">
          <img src={image} alt="Login" />
        </div>
        <div className="form">
          <h1>Login</h1>
          <div className="input">
            <label htmlFor="email">Email&nbsp;</label>
            <input
              id="email"
              type="email"
              placeholder="Type your email"
              onChange={(e) => {
                setinputEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password&nbsp;</label>
            <input
              id="password"
              type="password"
              placeholder="Type your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span className="error-message"></span>

          <button
            disabled={loading}
            onClick={handleLogin}
            style={
              !loading
                ? {
                    backgroundColor: "green",
                  }
                : { backgroundColor: "#eee", color: "black" }
            }
            className="button"
          >
            {loading ? (
              <div>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

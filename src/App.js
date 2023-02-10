import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth";

import { Profile } from "./components/Profile/Profile";
import { RequireAuth } from "./components/RequireAuth";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setEmail,
  setPhone,
  setProfileImage,
  setToken,
  setUserName,
} from "./rtk/slices/register-slice";
import UpdateProfile from "./components/UpdateProfile";
import ProjectTable from "./components/Packages";
import Packages from "./components/Packages";
import ProjectMenu from "./components/Menu";

import "./App.css";
import Ports from "./components/Ports";
import CreatePackage from "./components/CreatePackage";
import Toastify from "./components/Toastify";
import UpdatePackage from "./components/UpdatePackage";

function App() {
  const dispatch = useDispatch();
  // let isLogin = useSelector((state) => state.register.isLogin);

  useEffect(() => {
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
      // console.log(registerStorage.login);
      // console.log(`Token: ${registerStorage.token}`);
      if (registerStorage.login && registerStorage.token !== "") {
        dispatch(login());
        dispatch(setToken(registerStorage.token));
        dispatch(setEmail(registerStorage.email));
        dispatch(setUserName(registerStorage.name));
        dispatch(setPhone(registerStorage.phone));
      }
    }
  }, []);
  return (
    // <AuthProvider>
    <>
      {/* <div className="project-container"> */}
      <Navbar />
      <ProjectMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/toastify" element={<Toastify />} />
        {/* <Route path="/new-package" element={<CreatePackage />} /> */}

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/packages"
          element={
            <RequireAuth>
              <Packages />
            </RequireAuth>
          }
        />
        <Route
          path="/update-package/:packageID/:packageInfo"
          element={
            <RequireAuth>
              <UpdatePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/new-package"
          element={
            <RequireAuth>
              <CreatePackage />
            </RequireAuth>
          }
        />
        <Route
          path="/ports"
          element={
            <RequireAuth>
              <Ports />
            </RequireAuth>
          }
        />
      </Routes>
      {/* </div> */}
    </>

    // </AuthProvider>
  );
}

export default App;

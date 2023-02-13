import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { RequireAuth } from "./components/RequireAuth";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useDispatch } from "react-redux";
import {
  login,
  setEmail,
  setPhone,
  setToken,
  setUserName,
} from "./rtk/slices/register-slice";
import Packages from "./components/Packages";
import ProjectMenu from "./components/Menu";
import Ports from "./components/Ports";
import CreatePackage from "./components/CreatePackage";
import UpdatePackage from "./components/UpdatePackage";
import CreatePort from "./components/CreatePort";
import UpdatePort from "./components/UpdatePort";
import PortDetails from "./components/PortDetails";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
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
    <>
      <Navbar />
      <ProjectMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/new-port" element={<CreatePort />} />
        <Route path="/port-details/:portIdDetails" element={<PortDetails />} /> */}
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
        <Route
          path="/update-port/:portID/:portInfo"
          element={
            <RequireAuth>
              <UpdatePort />
            </RequireAuth>
          }
        />
        <Route
          path="/new-port"
          element={
            <RequireAuth>
              <CreatePort />
            </RequireAuth>
          }
        />
        <Route
          path="/port-details/:portIdDetails"
          element={
            <RequireAuth>
              <PortDetails />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;

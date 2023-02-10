import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }) => {
  let isLogin = useSelector((state) => state.register.isLogin);
  const location = useLocation();

  if (localStorage.getItem("register")) {
    let registerStorage = JSON.parse(localStorage.getItem("register"));
    if (registerStorage.login && registerStorage.token !== "") {
      isLogin = registerStorage.login;
    }
  }

  // useEffect(() => {

  // }, []);

  // const auth = useAuth();
  if (!isLogin) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

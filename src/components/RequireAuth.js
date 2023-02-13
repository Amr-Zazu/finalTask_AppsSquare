import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  let isLogin = useSelector((state) => state.register.isLogin);
  let token = useSelector((state) => state.register.token);
  const location = useLocation();

  if (localStorage.getItem("register")) {
    let registerStorage = JSON.parse(localStorage.getItem("register"));
    if (registerStorage.login && registerStorage.token !== "") {
      isLogin = registerStorage.login;
    }
  }

  if (!isLogin) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

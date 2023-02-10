import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectMenu from "../Menu";
import ProjectTable from "../Packages";
import "./home.css";

function Home() {
  const isLogin = useSelector((state) => state.register.isLogin);
  return (
    <>
      <div className="home-container">
        {/* <div className="home-menu">
          <ProjectMenu />
        </div> */}
        <div className="landing">
          <div className="home-info">
            <h1 className="title">
              dash<span>Borad</span>
            </h1>
            {!isLogin ? (
              <Link to="login" className="home-btn">
                Try it
              </Link>
            ) : (
              <Link to="profile" className="home-btn">
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;

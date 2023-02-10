import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, Link, useNavigate } from "react-router-dom";
import {
  login,
  setEmail,
  setPhone,
  setToken,
  setUserName,
} from "../../rtk/slices/register-slice";
import { useAuth } from "../auth";

import "./style.css";

export const Profile = () => {
  const navigate = useNavigate();

  const userName = useSelector((state) => state.register.user_name);
  const email = useSelector((state) => state.register.email);
  const phone = useSelector((state) => state.register.phone);

  // let userName = "";
  // let email = "";

  // const profileImage = useSelector((state) => state.register.profile_image);

  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const apiUrl = "https://bahar.appssquare.com/api/admin/profile";
  // var token = useSelector((state) => state.register.token);

  var token = useSelector((state) => state.register.token);

  // useEffect(() => {
  //   if (localStorage.getItem("register")) {
  //     let registerStorage = JSON.parse(localStorage.getItem("register"));
  //     console.log(registerStorage.login);
  //     console.log(registerStorage.token);
  //     if (registerStorage.login && registerStorage.token !== "") {
  //       token = registerStorage.token;
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", () => {

    // });
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
      console.log(registerStorage.login);
      console.log(registerStorage.token);
      if (registerStorage.login && registerStorage.token !== "") {
        token = registerStorage.token;
      }
    }

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setUserName(data.data.name);
        // setEmail(data.data.email);
        // setPhone(data.data.phone);
        // if (localStorage.getItem("recent-image")) {
        //   setProfileImage(localStorage.getItem("recent-image"));
        //   document.getElementById("image").style.display = "inline-block";
        // } else {
        //   setProfileImage(data.data.profile_image);
        // }

        // const phone = useSelector((state) => state.register.phone);
        // const profileImage = useSelector(
        //   (state) => state.register.profile_image
        // );
      });
  }, []);

  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfileImage(URL.createObjectURL(img));
      document.getElementById("image").style.display = "inline-block";
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <>
      <div className="profile">
        <div className="profile-data">
          <h1 className="name-profile">Welcome, {`${userName}`}</h1>
          <img id="image" src={profileImage} alt="" />
        </div>
        <p>Email: {`${email}`}</p>
        <p>phone: {`${phone}`}</p>
        <label htmlFor="fileUpload" className="image_label">
          Set Profile Image
        </label>
        <input
          type="file"
          className="image_input"
          id="fileUpload"
          name="myImage"
          onChange={onImageChange}
        ></input>
      </div>
    </>
  );
};

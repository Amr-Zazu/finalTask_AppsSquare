import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setEmail,
  setPhone,
  // setProfileImage,
  setUserName,
} from "../../rtk/slices/register-slice";

// import "./style.css";

const UpdateProfile = () => {
  var [inputUserName, setInputUserName] = useState("");
  var [inputEmail, setInputEmail] = useState("");
  var [inputPhone, setInputPhone] = useState("");
  var [inputProfileImage, setInputProfileImage] = useState("");

  const apiLink = "https://bahar.appssquare.com/api/admin/update_profile";
  var token = useSelector((state) => state.register.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setInputProfileImage(URL.createObjectURL(img));
      document.getElementById("image").style.display = "block";
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        localStorage.setItem("recent-image", reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function onClickUpdate(e) {
    e.preventDefault();
    fetch(apiLink, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputUserName,
        email: inputEmail,
        phone: inputPhone,
        profile_image: inputProfileImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setUserName(data.data.name));
        dispatch(setEmail(data.data.email));
        dispatch(setPhone(data.data.phone));
        // dispatch(setProfileImage(data.data.profile_image));
      });
    navigate("/profile");
  }

  return (
    <div className="update-profile">
      <h1>Update Your Profile</h1>
      <div className="update update-name">
        <label className="update-label" htmlFor="name">
          Name
        </label>
        <input
          className="update-input"
          type="text"
          id="name"
          onChange={(e) => {
            inputUserName = e.target.value;
          }}
        />
      </div>
      <div className="update update-email">
        <label className="update-label" htmlFor="email">
          Email
        </label>
        <input
          className="update-input"
          type="email"
          id="email"
          onChange={(e) => {
            inputEmail = e.target.value;
          }}
        />
      </div>

      <div className="update update-phone">
        <label className="update-label" htmlFor="phone">
          Phone
        </label>
        <input
          className="update-input"
          type="number"
          id="phone"
          onChange={(e) => {
            inputPhone = e.target.value;
          }}
        />
      </div>

      <div className="update update-profileImage">
        <label className="update-label">Profile Image</label>
        <label className=" image-label" htmlFor="profileImage">
          Upload Image
        </label>
        <input
          type="file"
          className="image-input"
          id="profileImage"
          onChange={onImageChange}
        ></input>
        <img id="image" src={inputProfileImage} alt="" />
      </div>
      <button onClick={onClickUpdate} className="update-submit">
        Submit
      </button>
    </div>
  );
};

export default UpdateProfile;

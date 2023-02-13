import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./style.css";

export const Profile = () => {
  const userName = useSelector((state) => state.register.user_name);
  const email = useSelector((state) => state.register.email);
  const phone = useSelector((state) => state.register.phone);

  const [profileImage, setProfileImage] = useState("");

  const apiUrl = "https://bahar.appssquare.com/api/admin/profile";

  var token = useSelector((state) => state.register.token);

  useEffect(() => {
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
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
        <div className="detailsProfile">
          <label className="profileDetails-label" htmlFor="name">
            User Name
          </label>
          <input
            disabled
            className="profileDetails-input"
            type="text"
            id="name"
            value={userName}
          />
        </div>
        <div className="detailsProfile">
          <label className="profileDetails-label" htmlFor="email">
            Email
          </label>
          <input
            disabled
            className="profileDetails-input"
            type="text"
            id="email"
            value={email}
          />
        </div>
        <div className="detailsProfile">
          <label className="profileDetails-label" htmlFor="phone">
            Phone
          </label>
          <input
            disabled
            className="profileDetails-input"
            type="number"
            id="phone"
            value={phone}
          />
        </div>

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

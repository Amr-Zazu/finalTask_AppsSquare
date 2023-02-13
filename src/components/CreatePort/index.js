import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.css";

const CreatePort = () => {
  const [arabicName, setArabicName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [cityID, setCityID] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiLink = "https://bahar.appssquare.com/api/admin/ports";

  var token = useSelector((state) => state.register.token);

  function onClickUpdate(e) {
    e.preventDefault();
    setLoading(true);
    fetch(apiLink, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name_ar: arabicName,
        name_en: englishName,
        city_id: cityID,
        latitude: latitude,
        longitude: longitude,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === true) {
          setLoading(false);
          if (!loading) {
            navigate("/ports");
          }
        } else {
          console.log(data.message);
          document.querySelector(
            ".error-message"
          ).innerHTML = `${data.message}`;
          document.querySelector(".error-message").style.display = "block";
          setLoading(false);
        }
      });
  }

  return (
    <div className="newPort-container">
      <h1 className="newPort-heading">Create New Port</h1>
      <div className="addNew">
        <label className="new-label" htmlFor="name">
          Arabic Name
        </label>
        <input
          className="new-input"
          type="text"
          id="name"
          onChange={(e) => {
            setArabicName(e.target.value);
          }}
        />
      </div>
      <div className="addNew">
        <label className="new-label" htmlFor="name">
          English Name
        </label>
        <input
          className="new-input"
          type="text"
          id="name"
          onChange={(e) => {
            setEnglishName(e.target.value);
          }}
        />
      </div>
      <div className="addNew">
        <label className="new-label" htmlFor="name">
          City ID
        </label>
        <input
          className="new-input"
          type="text"
          id="name"
          onChange={(e) => {
            setCityID(e.target.value);
          }}
        />
      </div>
      <div className="addNew">
        <label className="new-label" htmlFor="name">
          Latitude
        </label>
        <input
          className="new-input"
          type="text"
          id="name"
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
        />
      </div>
      <div className="addNew">
        <label className="new-label" htmlFor="name">
          Longitude
        </label>
        <input
          className="new-input"
          type="text"
          id="name"
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
        />
      </div>

      <span className="error-message"></span>

      <button
        style={!loading ? {} : { backgroundColor: "green" }}
        disabled={loading}
        onClick={onClickUpdate}
        className="newPort-submit"
      >
        {loading ? (
          <div>
            <Spinner
              className="add-port-spinner"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          "Add New Port"
        )}
      </button>
    </div>
  );
};

export default CreatePort;

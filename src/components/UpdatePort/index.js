import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";

const UpdatePort = () => {
  const { portID, portInfo } = useParams();
  const [arabicName, setArabicName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [cityID, setCityID] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiLink = "https://bahar.appssquare.com/api/admin/ports";
  var token = useSelector((state) => state.register.token);

  useEffect(() => {
    setArabicName(JSON.parse(portInfo).name_ar);
    setEnglishName(JSON.parse(portInfo).name_en);
    setCityID(JSON.parse(portInfo).city_id);
    setLatitude(JSON.parse(portInfo).latitude);
    setLongitude(JSON.parse(portInfo).longitude);
  }, []);

  const portUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${apiLink}/${portID}`, {
      method: "PUT",
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
  };

  return (
    <div className="updatePort-container">
      <h1 className="updatePort-heading">Update Port</h1>
      <div className="updatePort">
        <label className="update-label" htmlFor="name_ar">
          Arabic Name
        </label>
        <input
          className="update-input"
          type="text"
          id="name_ar"
          value={arabicName}
          onChange={(e) => {
            setArabicName(e.target.value);
          }}
        />
      </div>
      <div className="updatePort">
        <label className="update-label" htmlFor="name_en">
          English Name
        </label>
        <input
          className="update-input"
          type="text"
          id="name_en"
          value={englishName}
          onChange={(e) => {
            setEnglishName(e.target.value);
          }}
        />
      </div>
      <div className="updatePort">
        <label className="update-label" htmlFor="city_id">
          City ID
        </label>
        <input
          className="update-input"
          type="text"
          id="city_id"
          value={cityID}
          onChange={(e) => {
            setCityID(e.target.value);
          }}
        />
      </div>
      <div className="updatePort">
        <label className="update-label" htmlFor="latitude">
          Latitude
        </label>
        <input
          className="update-input"
          type="text"
          id="latitude"
          value={latitude}
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
        />
      </div>
      <div className="updatePort">
        <label className="update-label" htmlFor="longitude">
          Longitude
        </label>
        <input
          className="update-input"
          type="text"
          id="longitude"
          value={longitude}
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
        />
      </div>

      <span className="error-message"></span>

      <button
        style={!loading ? {} : { backgroundColor: "green" }}
        disabled={loading}
        onClick={portUpdate}
        className="update-submit"
      >
        {loading ? (
          <div>
            <Spinner
              className="update-port-spinner"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          "Update Port"
        )}
      </button>
    </div>
  );
};

export default UpdatePort;

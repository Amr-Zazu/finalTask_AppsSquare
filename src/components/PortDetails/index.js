import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import "./style.css";

const PortDetails = () => {
  const { portIdDetails } = useParams();
  const [arabicName, setArabicName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [cityID, setCityID] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const apiLink = "https://bahar.appssquare.com/api/admin/ports";

  var token = useSelector((state) => state.register.token);

  useEffect(() => {
    if (localStorage.getItem("register")) {
      let registerStorage = JSON.parse(localStorage.getItem("register"));
      if (registerStorage.login && registerStorage.token !== "") {
        token = registerStorage.token;
      }
    }
    setLoading(true);
    fetch(`${apiLink}/${portIdDetails}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArabicName(data.data.name_ar);
        setEnglishName(data.data.name_en);
        setCityID(data.data.city_id);
        setLatitude(data.data.latitude);
        setLongitude(data.data.longitude);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="detailsPort-container">
      {loading ? (
        <Spinner
          className="port-spinner"
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <>
          <h1 className="detailsPort-heading">Port Details</h1>
          <div className="detailsPort">
            <label className="details-label" htmlFor="name_ar">
              Arabic Name
            </label>
            <input
              disabled
              className="details-input"
              type="text"
              id="name_ar"
              value={arabicName}
            />
          </div>
          <div className="detailsPort">
            <label className="details-label" htmlFor="name_en">
              English Name
            </label>
            <input
              disabled
              className="details-input"
              type="text"
              id="name_en"
              value={englishName}
            />
          </div>
          <div className="detailsPort">
            <label className="details-label" htmlFor="city_id">
              City ID
            </label>
            <input
              disabled
              className="details-input"
              type="text"
              id="city_id"
              value={cityID}
            />
          </div>
          <div className="detailsPort">
            <label className="details-label" htmlFor="latitude">
              Latitude
            </label>
            <input
              disabled
              className="details-input"
              type="text"
              id="latitude"
              value={latitude}
            />
          </div>
          <div className="detailsPort">
            <label className="details-label" htmlFor="longitude">
              Longitude
            </label>
            <input
              disabled
              className="details-input"
              type="text"
              id="longitude"
              value={longitude}
            />
          </div>
          <Link className="back-btn" to="/ports">
            Back
          </Link>
        </>
      )}
    </div>
  );
};

export default PortDetails;

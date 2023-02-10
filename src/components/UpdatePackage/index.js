import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";

const UpdatePackage = () => {
  const { packageID, packageInfo } = useParams();
  const [arabicName, setArabicName] = useState("");
  const [englishName, setEnglishName] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const apiLink = "https://bahar.appssquare.com/api/admin/packages";

  var token = useSelector((state) => state.register.token);

  useEffect(() => {
    setArabicName(JSON.parse(packageInfo).name_ar);
    setEnglishName(JSON.parse(packageInfo).name_en);
  }, []);

  const packageUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://bahar.appssquare.com/api/admin/packages/${packageID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name_ar: arabicName,
        name_en: englishName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === true) {
          setLoading(false);
          if (!loading) {
            navigate("/packages");
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
    <div className="updatePackage-container">
      <h1 className="updatePackage-heading">Update Package</h1>
      <div className="updatePackage">
        <label className="update-label" htmlFor="name">
          Arabic Name
        </label>
        <input
          className="update-input"
          type="text"
          id="name"
          value={arabicName}
          onChange={(e) => {
            setArabicName(e.target.value);
          }}
        />
      </div>
      <div className="updatePackage">
        <label className="update-label" htmlFor="name">
          English Name
        </label>
        <input
          className="update-input"
          type="text"
          id="name"
          value={englishName}
          onChange={(e) => {
            setEnglishName(e.target.value);
          }}
        />
      </div>

      <span className="error-message"></span>

      <button
        style={
          !loading
            ? {
                backgroundColor: "green",
              }
            : { backgroundColor: "#eee" }
        }
        disabled={loading}
        onClick={packageUpdate}
        className="new-submit"
      >
        {loading ? (
          <div>
            <Spinner
              className="package-spinner"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          "Update Package"
        )}
      </button>
    </div>
  );
};

export default UpdatePackage;

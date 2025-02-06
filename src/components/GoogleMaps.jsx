import React from "react";
import { useSelector } from "react-redux";
import useGoogleMap from "../hooks/useGoogleMap";

const GoogleMap = ({ place, restaurants = [] }) => {
  const language = useSelector((state) => state.language.language);
  const apiKey = "AIzaSyBXLbr9864Nsz2MiEshdNVDSqnHmFgPcOA";

  useGoogleMap(place, restaurants, language, apiKey);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", marginTop: "20px" }}
    ></div>
  );
};

export default GoogleMap;

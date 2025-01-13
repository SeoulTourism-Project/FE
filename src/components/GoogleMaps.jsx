import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GoogleMap = ({ place, restaurants }) => {
  const language = useSelector((state) => state.language.language);
  //   const [language, setLanguage] = useState("en"); // 기본 언어: 영어
  const [map, setMap] = useState(null); // 지도 객체

  const apiKey = "AIzaSyBXLbr9864Nsz2MiEshdNVDSqnHmFgPcOA"; // 여기에 Google Maps API 키를 입력하세요.

  // Google Maps API 스크립트를 동적으로 로드하는 함수
  const loadGoogleMapsScript = (lang) => {
    return new Promise((resolve, reject) => {
      // 이미 로드된 Google Maps 스크립트가 있으면 삭제
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // 새 스크립트 태그 생성
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=${lang}&libraries=advanced-markers`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log(`Google Maps API loaded with language: ${lang}`);

        resolve(window.google.maps);
      };

      script.onerror = (error) => {
        console.error("Failed to load Google Maps API:", error);
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  // 지도를 초기화하는 함수
  const initializeMap = () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const options = {
      center: { lat: place.lat, lng: place.lng }, // 서울
      zoom: 16,
    };

    const newMap = new window.google.maps.Map(mapElement, options);
    setMap(newMap); // 생성된 지도 객체를 상태에 저장

    // 레스토랑 마커 추가
    restaurants.forEach((restaurant) =>
      addMarker(newMap, restaurant, "restaurant")
    );

    // 주요 장소 마커 추가
    addMarker(newMap, place, "place");
  };

  // 마커 추가 함수
  const addMarker = (map, location, type) => {
    const iconUrls = {
      place: "/images/redMarker.png",
      restaurant: "/images/blueRestaurantMarker.png",
    };

    const iconSize =
      type === "place" ? { width: 40, height: 40 } : { width: 35, height: 35 };

    const marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      title: location.title,
      icon: {
        url: iconUrls[type],
        scaledSize: new window.google.maps.Size(
          iconSize.width,
          iconSize.height
        ),
      },
    });

    // 마커 클릭 이벤트
    marker.addListener("click", () => {
      alert(`You clicked on: ${location.title}`);
    });
  };

  // 언어가 변경될 때마다 Google Maps API를 다시 로드하고 지도 초기화
  useEffect(() => {
    loadGoogleMapsScript(language)
      .then(() => {
        initializeMap();
      })
      .catch((error) => console.error(error));
  }, [language]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", marginTop: "20px" }}
    ></div>
  );
};

export default GoogleMap;

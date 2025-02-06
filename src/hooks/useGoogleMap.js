import { useEffect, useState } from "react";

// 서울 시청 기본값 설정
const SEOUL_CITY_HALL = {
  name: "서울 시청",
  lat: 37.5665,
  lng: 126.978,
};

const useGoogleMap = (
  place = SEOUL_CITY_HALL,
  restaurants = [],
  language,
  apiKey
) => {
  const [map, setMap] = useState(null);

  const loadGoogleMapsScript = (lang) => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

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

  const initializeMap = () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const options = {
      center: { lat: place.lat, lng: place.lng },
      zoom: 17,
    };

    const newMap = new window.google.maps.Map(mapElement, options);
    setMap(newMap);

    // 레스토랑 마커 추가
    restaurants.forEach((restaurant) =>
      addMarker(newMap, restaurant, "restaurant")
    );

    // 주요 장소 마커 추가
    addMarker(newMap, place, "place");
  };

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

    marker.addListener("click", () => {
      alert(`You clicked on: ${location.title}`);
    });
  };

  useEffect(() => {
    loadGoogleMapsScript(language)
      .then(() => {
        initializeMap();
      })
      .catch((error) => console.error(error));
  }, [language, place]);

  return { map };
};

export default useGoogleMap;

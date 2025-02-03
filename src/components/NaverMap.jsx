import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const NaverMap = ({ place, restaurants }) => {
  const mapElement = useRef(null); // 지도를 렌더링할 DOM 요소 참조

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=fvn01ozm0j&language=en`; // 네이버 클라이언트 ID 입력 - 영어어
    script.async = true;

    script.onload = () => {
      const { naver } = window;

      if (!naver) {
        console.error("네이버 지도 API가 로드되지 않았습니다.");
        return;
      }

      // 지도 생성
      const mapOptions = {
        center: new naver.maps.LatLng(place.lat, place.lng),
        zoom: 16, // 지도 확대 수준
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: naver.maps.MapTypeControlStyle.BUTTON,
          postion: naver.maps.Position.TOP_RIGHT,
        },
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_LEFT,
        },
        scaleControl: true,
        scaleControlOptions: {
          position: naver.maps.Position.BOTTOM_CENTER,
        },
        logoControl: false,
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);

      // 주위 음식점 marker
      restaurants.forEach((restaurant) => {
        const restaurantMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(restaurant.lat, restaurant.lng),
          map,
          title: restaurant.title,
          icon: {
            url: "/images/redRestaurantMarker.png",
            size: new naver.maps.Size(35, 35),
            scaledSize: new naver.maps.Size(35, 35),
          },
        });

        // 상세 페이지 장소 marker
        const placeMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(place.lat, place.lng),
          map,
          title: place.title,
          icon: {
            url: "/images/blueMarker.png",
            size: new naver.maps.Size(40, 40),
            scaledSize: new naver.maps.Size(40, 40),
          },
        });

        // 마커 클릭 이벤트 등록
        naver.maps.Event.addListener(restaurantMarker, "click", () => {
          alert(`${restaurant.title} 마커가 클릭되었습니다!`);
        });
      });
    };

    script.onerror = () => {
      console.error("네이버 지도 API 스크립트 로드 실패");
    };

    document.head.appendChild(script); // 스크립트를 head에 추가

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  return (
    <>
      <NaverMapContainer ref={mapElement}></NaverMapContainer>
    </>
  );
};

const NaverMapContainer = styled.div`
  width: 1000px;
  height: 400px;
`;

export default NaverMap;

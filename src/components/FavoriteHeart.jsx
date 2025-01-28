import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

// Mock API 요청
const mockApi = {
  add: (mapId) =>
    new Promise((resolve) => {
      console.log(`Mock Add 요청: mapId=${mapId}`);
      setTimeout(() => resolve(`Add 요청 완료: mapId=${mapId}`), 2000);
    }),
  delete: (mapId) =>
    new Promise((resolve) => {
      console.log(`Mock Delete 요청: mapId=${mapId}`);
      setTimeout(() => resolve(`Delete 요청 완료: mapId=${mapId}`), 2000);
    }),
};

const FavoriteHeart = ({
  initialFavorite = false,
  mapId,
  pageType, // "manage", "detail", "overlay"
  debounceTime = 300,
  onCardDelete, // 카드 삭제 콜백 (manage 전용)
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);

  // 요청 처리 로직
  const handleRequest = async (newFavorite) => {
    setLoading(true);
    try {
      if (newFavorite) {
        await mockApi.add(mapId); // Add 요청
        console.log("찜 추가 완료!");
      } else {
        await mockApi.delete(mapId); // Delete 요청
        console.log("찜 삭제 완료!");
      }

      // manage 페이지에서 카드 삭제 처리
      if (pageType === "manage" && !newFavorite) {
        onCardDelete && onCardDelete();
      }
    } catch (error) {
      console.error("요청 실패:", error);
      setIsFavorite(!newFavorite); // 상태 롤백
    } finally {
      setLoading(false);
    }
  };

  // 클릭 핸들러
  const handleClick = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);

    // Debounce 처리
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => handleRequest(newFavorite), debounceTime);
    setTimer(newTimer);
  };

  // 타이머 정리
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return (
    <HeartContainer
      onClick={!loading ? handleClick : undefined}
      isFavorite={isFavorite}
      isOverlay={pageType === "overlay" || pageType === "manage"}
    >
      <FontAwesomeIcon icon={isFavorite ? filledHeart : emptyHeart} />
    </HeartContainer>
  );
};

export default FavoriteHeart;

// 스타일 정의
const HeartContainer = styled.div`
  position: ${(props) => (props.isOverlay ? "absolute" : "static")};
  top: ${(props) => (props.isOverlay ? "10px" : "auto")};
  right: ${(props) => (props.isOverlay ? "10px" : "auto")};
  font-size: 1.5rem;
  color: ${(props) =>
    props.isFavorite ? "red" : props.isOverlay ? "#fff" : "#ddd"};
  padding: ${(props) => (props.isOverlay ? "5px" : "0")};
  background: ${(props) => (props.isOverlay ? "#00000050" : "none")};
  border-radius: 8px;
  cursor: ${(props) => (props.loading ? "not-allowed" : "pointer")};
  z-index: ${(props) => (props.isOverlay ? "1" : "auto")};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (props.loading ? "#fff" : "red")};
  }
`;

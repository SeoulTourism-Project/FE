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
  const [prevFavorite, setPrevFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (newFavorite) => {
    setLoading(true);
    try {
      if (newFavorite) {
        await mockApi.add(mapId);
        console.log("찜 추가 완료!");
      } else {
        await mockApi.delete(mapId);
        console.log("찜 삭제 완료!");
        if (pageType === "manage") {
          onCardDelete && onCardDelete();
        }
      }
      setPrevFavorite(newFavorite);
    } catch (error) {
      console.error("요청 실패:", error);
      setIsFavorite(prevFavorite); // 상태 롤백
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageType === "manage") return; // manage 모드는 debounce X
    const timer = setTimeout(() => {
      if (isFavorite === prevFavorite) {
        console.log("Debounce 후 상태가 동일하므로 요청 취소");
        return;
      }
      handleRequest(isFavorite);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [isFavorite, debounceTime]);

  const handleClick = () => {
    if (loading) return;
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);

    if (pageType === "manage") {
      // 즉시 API 요청 실행
      handleRequest(newFavorite);
    }
  };

  return (
    <HeartContainer
      onClick={handleClick}
      $isFavorite={isFavorite}
      $isOverlay={pageType === "overlay" || pageType === "manage"}
      loading={loading ? "true" : undefined}
    >
      <FontAwesomeIcon icon={isFavorite ? filledHeart : emptyHeart} />
    </HeartContainer>
  );
};

export default FavoriteHeart;

const HeartContainer = styled.div`
  position: ${(props) => (props.$isOverlay ? "absolute" : "static")};
  top: ${(props) => (props.$isOverlay ? "10px" : "auto")};
  right: ${(props) => (props.$isOverlay ? "10px" : "auto")};
  font-size: 1.5rem;
  color: ${(props) =>
    props.$isFavorite ? "red" : props.$isOverlay ? "#fff" : "#ddd"};
  padding: ${(props) => (props.$isOverlay ? "5px" : "0")};
  background: ${(props) => (props.$isOverlay ? "#00000050" : "none")};
  border-radius: 8px;
  cursor: ${(props) => (props.loading ? "not-allowed" : "pointer")};
  z-index: ${(props) => (props.$isOverlay ? "1" : "auto")};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (props.loading ? "#fff" : "red")};
  }
`;

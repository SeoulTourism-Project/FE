import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { toggleFavorite } from "../api/favoriteHeartAPI";

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

  const handleRequest = async () => {
    setLoading(true);
    try {
      const newFavorite = await toggleFavorite(mapId);
      setIsFavorite(newFavorite);
      setPrevFavorite(newFavorite);

      if (!newFavorite && pageType === "manage") {
        onCardDelete && onCardDelete();
      }
    } catch (error) {
      console.error(error.message);
      setIsFavorite(prevFavorite); // 실패 시 상태 롤백
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
      handleRequest();
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [isFavorite, debounceTime]);

  const handleClick = () => {
    if (loading) return;
    setIsFavorite(!isFavorite);

    if (pageType === "manage") {
      // 즉시 API 요청 실행
      handleRequest();
    }
  };

  return (
    <HeartContainer
      onClick={handleClick}
      isFavorite={isFavorite}
      isOverlay={pageType === "overlay" || pageType === "manage"}
      loading={loading}
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

import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const FavoriteHeart = ({
  initialFavorite = false,
  position = { top: "10px", right: "10px" },
  backgroundColor,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <HeartContainer
      onClick={toggleFavorite}
      isFavorite={isFavorite}
      position={position}
      backgroundColor={backgroundColor}
    >
      <FontAwesomeIcon icon={isFavorite ? filledHeart : emptyHeart} />
    </HeartContainer>
  );
};

export default FavoriteHeart;

// 스타일 정의
const HeartContainer = styled.div`
  position: absolute;
  top: ${(props) => props.position.top};
  right: ${(props) => props.position.right};
  font-size: 1.5rem;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => (props.isFavorite ? "red" : "#fff")};
  padding: 5px;
  border-radius: 8px;

  cursor: pointer;
  z-index: 10;
  transition: color 0.2s ease;

  &:hover {
    color: red;
  }
`;

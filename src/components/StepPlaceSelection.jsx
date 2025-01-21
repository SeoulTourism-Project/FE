import React from "react";
import styled from "styled-components";

const StepPlaceSelection = ({ selectedPlace, setSelectedPlace, onNext }) => {
  return (
    <>
      <h2>여행지 선택</h2>
      <PlaceCardContainer>
        {["서울 타워", "한강 공원", "경복궁"].map((place) => (
          <PlaceCard
            key={place}
            onClick={() => setSelectedPlace(place)}
            isSelected={selectedPlace === place}
          >
            {place}
          </PlaceCard>
        ))}
      </PlaceCardContainer>
      <NextButton onClick={onNext} disabled={!selectedPlace}>
        다음
      </NextButton>
    </>
  );
};

const PlaceCardContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const PlaceCard = styled.div`
  background: ${(props) => (props.isSelected ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const NextButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default StepPlaceSelection;

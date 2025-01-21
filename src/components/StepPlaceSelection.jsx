import React from "react";
import styled from "styled-components";
import ScheduleCard from "./ScheduleCard";

const StepPlaceSelection = ({
  locations,
  selectedPlace,
  setSelectedPlace,
  onNext,
}) => {
  return (
    <>
      <h2>여행지 선택</h2>
      <ScrollableList>
        {locations.map((place) => (
          <PlaceCard
            key={place.id}
            isSelected={selectedPlace?.id === place.id}
            onClick={() => {
              setSelectedPlace(place);
              console.log("Selected Place:", place.id);
            }}
          >
            <ScheduleCard schedule={place} />
          </PlaceCard>
        ))}
      </ScrollableList>
      <NextButton onClick={onNext} disabled={!selectedPlace}>
        다음
      </NextButton>
    </>
  );
};

const ScrollableList = styled.ul`
  max-height: 75%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const PlaceCard = styled.div`
  background: ${(props) => (props.isSelected ? "#f0f0f0" : "white")};
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background: ${(props) => (props.isSelected ? "#0056b3" : "#dcdcdc")};
  }
`;

const NextButton = styled.button`
  background: #000;
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

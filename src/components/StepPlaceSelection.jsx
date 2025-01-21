import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StepPlaceSelection = ({ selectedPlace, setSelectedPlace, onNext }) => {
  const [locations, setLocations] = useState([]); // 좋아요가 true인 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // public 폴더에 있는 location.json 가져오기
        const response = await axios.get("/location.json");
        const data = response.data;

        // likeStatus가 true인 데이터만 필터링
        const likedLocations = data.filter(
          (location) => location.likeStatus === true
        );
        setLocations(likedLocations);
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h2>여행지 선택</h2>
      <ScrollableList>
        {locations.map((place) => (
          <PlaceCard
            key={place.id}
            onClick={() => setSelectedPlace(place)}
            isSelected={selectedPlace.id === place.id}
          >
            <img src={place.image} alt={place.name} width="100" />
            <h3>{place.name}</h3>
            <p>{place.description}</p>
          </PlaceCard>
        ))}
      </ScrollableList>
      <NextButton onClick={onNext} disabled={!selectedPlace}>
        다음
      </NextButton>
    </>
  );
};

const PlaceCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 카드가 넘치면 다음 줄로 */
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const ScrollableList = styled.ul`
  max-height: 400px; /* 스크롤 가능한 최대 높이 */
  overflow-y: auto; /* 수직 스크롤 활성화 */
  padding: 0;
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
  background: ${(props) => (props.isSelected ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
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

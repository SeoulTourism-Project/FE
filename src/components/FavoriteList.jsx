import { useEffect, useState } from "react";
import styled from "styled-components";
import TouristAttractionItem from "./TouristAttractionItem"; // 관광지 카드 컴포넌트 재사용

const InterestList = () => {
  const [favorites, setFavorites] = useState([]);

  // 예시 데이터: 실제로는 사용자 인터랙션으로 추가
  const exampleFavorites = [
    {
      id: 1,
      name: "서울 타워",
      address: "서울특별시 용산구 남산공원길 105",
      image: "images/nseoultower.jpg",
    },
    {
      id: 2,
      name: "경복궁",
      address: "서울특별시 종로구 사직로 161",
      image: "images/gyeongbokgung.jpg",
    },
  ];

  // 초기 데이터 로드
  useEffect(() => {
    setFavorites(exampleFavorites); // 실제 데이터로 교체 가능
  }, []);

  return (
    <Container>
      {favorites.length === 0 ? (
        <p>찜한 장소가 없습니다.</p>
      ) : (
        <CardContainer>
          {favorites.map((item) => (
            <TouristAttractionItem key={item.id} touristAttraction={item} />
          ))}
        </CardContainer>
      )}
    </Container>
  );
};

export default InterestList;

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

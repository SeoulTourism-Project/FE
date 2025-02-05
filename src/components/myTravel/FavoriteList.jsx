import { useEffect, useState } from "react";
import styled from "styled-components";
import TouristAttractionItem from "./TouristAttractionItem";
import FavoriteHeart from "./FavoriteHeart";
import axios from "axios";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/location.json");
        const data = response.data;

        const likedLocations = data.filter(
          (location) => location.likeStatus === true
        );
        setFavorites(likedLocations);
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {favorites.length === 0 ? (
        <p>찜한 장소가 없습니다.</p>
      ) : (
        <CardContainer>
          {favorites.map((item) => (
            <ItemWrapper key={item.id}>
              <FavoriteHeart
                initialFavorite={item.likeStatus}
                mapId={item.id}
                pageType="manage"
                onCardDelete={() => handleFavoriteToggle(item.id)}
              />
              <TouristAttractionItem touristAttraction={item} width={"100%"} />
            </ItemWrapper>
          ))}
        </CardContainer>
      )}
    </Container>
  );
};

export default FavoriteList;

// 스타일 정의
const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
`;

const ItemWrapper = styled.div`
  position: relative;
  width: calc(25% - 15px);
`;

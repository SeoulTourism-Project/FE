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
                backgroundColor="#00000050"
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
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const ItemWrapper = styled.div`
  position: relative;
  width: calc(25% - 20px);
`;

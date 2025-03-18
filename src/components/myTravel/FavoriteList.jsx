import { useEffect, useState } from "react";
import styled from "styled-components";
import TouristAttractionItem from "../TouristAttractionItem";
import FavoriteHeart from "../FavoriteHeart";
import { fetchFavoriteList } from "../../api/favoriteListAPI";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavoriteList = async () => {
      try {
        const data = await fetchFavoriteList();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFavoriteList();
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

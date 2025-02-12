import {
  faAngleLeft,
  faLocationDot,
  faPhone,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import GoogleMaps from "../components/GoogleMaps";
import FavoriteHeart from "../components/FavoriteHeart";
import { useEffect, useState } from "react";
import { fetchTouristAttractionById } from "../api/touristAttractionDetailsAPI";

const TouristAttractionDetail = () => {
  const [touristAttraction, setTouristAttraction] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadTouristAttraction = async () => {
      try {
        const data = await fetchTouristAttractionById(id);
        setTouristAttraction(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTouristAttraction();
  }, [id]);

  if (!touristAttraction) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <ListView>
        <BackButton onClick={() => navigate("/tourist-attraction")}>
          <FontAwesomeIcon icon={faAngleLeft} size="2x" />
          <span>목록으로</span>
        </BackButton>
      </ListView>
      <LocationContainer>
        <LocationInfoArea>
          <LocationImage>
            <img src={touristAttraction.image} alt={touristAttraction.name} />
          </LocationImage>
          <LocationInfo>
            <TitleContainer>
              <h3>{touristAttraction.name}</h3>
              <FavoriteHeart
                initialFavorite={touristAttraction.favorite}
                mapId={touristAttraction.mapId}
                pageType="detail"
                debounceTime={500}
              />
            </TitleContainer>
            <p>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{touristAttraction.address}</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              <span>{touristAttraction.contactNum}</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faShop} />
              <span>{touristAttraction.closeDate}</span>
            </p>
            <div className="operation-time">
              <FontAwesomeIcon icon={faShop} />
              <span>{touristAttraction.operationTime}</span>
            </div>
            <p>{touristAttraction.info}</p>
          </LocationInfo>
        </LocationInfoArea>
        <LocationMapArea>
          <GoogleMaps
            place={{
              lat: touristAttraction.lat,
              lng: touristAttraction.lng,
              title: touristAttraction.name,
            }}
          />
        </LocationMapArea>
      </LocationContainer>
    </>
  );
};

export default TouristAttractionDetail;

const ListView = styled.div`
  width: 1280px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 50px 0;
  border: none;
  background: transparent;
  cursor: pointer;

  & span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const LocationContainer = styled.section`
  width: 1280px;
`;

const LocationInfoArea = styled.div`
  display: flex;
`;

const LocationImage = styled.div`
  min-width: 600px;

  & img {
    display: block;
    width: 100%;
    height: 400px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const LocationInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 0 20px 30px;
  position: relative;

  & h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  & span {
    margin-left: 10px;
  }

  & p:last-child {
    max-height: 278px;
    overflow-y: auto;
    padding: 1px 0;
  }

  .operation-time {
    display: flex;
    align-items: start;
  }

  .operation-time span {
    white-space: pre-line;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin-right: 10px;
  }
`;

const LocationMapArea = styled.div`
  padding: 50px 0;

  & img {
    display: block;
    width: 100%;
    height: 700px;
    border-radius: 8px;
  }
`;

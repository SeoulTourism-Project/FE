import { faAngleLeft, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import GoogleMaps from "../components/GoogleMaps";
import FavoriteHeart from "../components/FavoriteHeart";

const TouristAttractionDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return alert("데이터가 없습니다.");
  }

  const { id, name, image, address } = state;

  // 마커 생성
  const place = {
    lat: 37.5665,
    lng: 126.978,
    title: "서울 시청",
  };

  const restaurants = [
    { lat: 37.5633, lng: 126.9853, title: "명동교자" },
    { lat: 37.5703, lng: 126.9976, title: "광장시장" },
    { lat: 37.5652, lng: 126.9779, title: "팔선" },
    { lat: 37.5631, lng: 126.9786, title: "백리향" },
    { lat: 37.5707, lng: 126.9783, title: "광화문집" },
    { lat: 37.5706, lng: 126.9753, title: "토속촌" },
    { lat: 37.5558, lng: 126.9731, title: "서울역 한옥집" },
    { lat: 37.5618, lng: 126.9766, title: "한양옥" },
    { lat: 37.5641, lng: 126.9843, title: "명동밀면" },
    { lat: 37.5662, lng: 126.9783, title: "서울식당" },
  ];

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
            <img src={`/${image}`} alt="" />
          </LocationImage>
          <LocationInfo>
            <TitleContainer>
              <h3>{name}</h3>
              <FavoriteHeart
                initialFavorite={false}
                mapId={id}
                pageType="detail"
                debounceTime={500}
              />
            </TitleContainer>
            <p>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{address}</span>
            </p>
            <p>
              조선 시대의 대표 궁궐로, 한국 전통 건축물의 아름다움을 감상할 수
              있는 곳입니다.
            </p>
          </LocationInfo>
        </LocationInfoArea>
        <LocationMapArea>
          <GoogleMaps place={place} restaurants={restaurants} />
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0 20px 30px;

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
    border-radius: 8px;
  }
`;

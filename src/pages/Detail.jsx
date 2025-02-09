import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const data = [
  {
    id: 1,
    name: "서울숲",
    description: "서울숲 공원의 설명입니다.",
    address: "서울특별시 성동구 뚝섬로 273",
    image: "image1.jpg",
    mapImage: "seoulforest-map.jpg",
  },
  {
    id: 2,
    name: "박영옥",
    description: "박영옥의 설명입니다.",
    address: "서울특별시 성동구 XX로 123",
    image: "image2.jpg",
    mapImage: "park-map.jpg",
  },
];

const Wrapper = styled.div`
  padding: 20px;
`;

const Back = styled.button`
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-right: 10px;
`;

const Heart = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.liked ? "red" : "#ccc")};
`;

const Address = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 10px 0 20px;
`;

const MapImg = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
`;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = data.find((p) => p.id === parseInt(id));
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked(!liked);

  if (!place) return <Wrapper>데이터가 없습니다.</Wrapper>;

  return (
    <Wrapper>
      <Back onClick={() => navigate(-1)}>← 뒤로가기</Back>
      <Content>
        <Img src={place.image} alt={place.name} />
        <TitleRow>
          <Title>{place.name}</Title>
          <Heart liked={liked} onClick={handleLike}>
            ♥
          </Heart>
        </TitleRow>
        <Address>{place.address}</Address>
        <Description>{place.description}</Description>
        <MapImg src={place.mapImage} alt={`${place.name} 지도`} />
      </Content>
    </Wrapper>
  );
};

export default Detail;

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const data = [
  { id: 1, name: "서울숲", description: "서울숲 공원의 설명입니다.", image: "image1.jpg" },
  { id: 2, name: "박영옥", description: "슈퍼코딩딩의 설명입니다.", image: "image2.jpg" },
  { id: 3, name: "노을길", description: "노을길의 설명입니다.", image: "image3.jpg" },
];

const Wrapper = styled.div`
  padding: 20px;
  background: #f5f5f5;
`;

const Item = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Img = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin: 10px 0;
`;

const TouristAttraction = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/tourist-attraction/${id}`);
  };

  return (
    <Wrapper>
      {data.map((place) => (
        <Item key={place.id} onClick={() => handleClick(place.id)}>
          <Img src={place.image} alt={place.name} />
          <Title>{place.name}</Title>
        </Item>
      ))}
    </Wrapper>
  );
};

export default TouristAttraction;

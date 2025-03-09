import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import styled from "styled-components";

const GoodsItem = ({ item, handleOpenModal }) => {
  return (
    <Container key={item.id}>
      <Buttons>
        <DetailLink to={`/goods-detail/${item.id}`}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
        </DetailLink>
        <button onClick={() => handleOpenModal(item.id, 1)}>
          <FontAwesomeIcon icon={faCartPlus} size="2x" />
        </button>
      </Buttons>
      <Image src={item.imgUrl} alt={item.title} />
      <Title>{item.title}</Title>
      <Price>가격 : {item.price}</Price>
    </Container>
  );
};

export default GoodsItem;

const Container = styled.li`
  width: 312px;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  button {
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
  }

  &:hover {
    opacity: 1;
  }
`;

const DetailLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:visited {
    color: white;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  display: block;
  border-radius: 10px;
`;

const Title = styled.h4`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const Price = styled.p`
  margin-top: 10px;
`;

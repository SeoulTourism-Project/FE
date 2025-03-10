import {
  faAngleLeft,
  faCartPlus,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styled from "styled-components";
import { fetchGoodDetails } from "../api/goodDetailsAPI";
import CartConfirmModal from "../components/CartConfirmModal";
import { getAccessToken } from "../utils/decodeToken";

const GoodsDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getGoodsDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchGoodDetails(id);
        setGoods(data);
      } catch (error) {
        console.error("굿즈 데이터를 가져오는 중 오류 발생:", error);
      }
      setLoading(false);
    };

    getGoodsDetails();
  }, [id]);

  useEffect(() => {
    setUser(getAccessToken() ? true : false);
  }, []);

  function handleAddCart() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  if (loading) return <p>로딩 중...</p>;
  if (!goods) return <p>상품 정보를 불러올 수 없습니다.</p>;

  return (
    <Container>
      {showModal && (
        <CartConfirmModal user={user} handleCloseModal={handleCloseModal} />
      )}

      <ListLink to={"/goods"}>
        <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        <span>목록으로</span>
      </ListLink>

      <Product>
        <img src={goods.imageUrl} alt={goods.name} />
        <Info>
          <Title>{goods.name}</Title>
          <Category>{goods.category || "카테고리 없음"}</Category>
          <Description>{goods.description}</Description>
          <Price>가격 : {goods.price}원</Price>
          <Stock>재고 : {goods.stock}개</Stock>
          <Buttons>
            <button>
              <FontAwesomeIcon icon={faCreditCard} size="2x" />
            </button>
            <button onClick={handleAddCart}>
              <FontAwesomeIcon icon={faCartPlus} size="2x" />
            </button>
          </Buttons>
        </Info>
      </Product>
    </Container>
  );
};

export default GoodsDetail;

const Container = styled.div`
  width: 1280px;
  margin-top: 20px;
`;

const ListLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;

  & span {
    font-size: 20px;
    padding-top: 3px;
  }

  &:visited {
    color: black;
  }
`;

const Product = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 50px;

  & img {
    width: 500px;
    height: 500px;
    display: block;
    border-radius: 10px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

const Title = styled.h4`
  font-size: 50px;
  font-weight: bold;
`;

const Category = styled.p`
  opacity: 0.5;
`;

const Description = styled.p`
  height: 120px;
  overflow: auto;
  padding-right: 10px;
  line-height: 1.4;
  font-size: 16px;
`;

const Price = styled.p`
  font-size: 20px;
`;

const Stock = styled.p`
  opacity: 0.5;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  & button {
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;

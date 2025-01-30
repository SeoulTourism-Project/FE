import { faAngleLeft, faCartPlus, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import styled from 'styled-components';
import { Modal } from '../components/Modal';

const GoodsDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const goods = useSelector((state) => state.goods);

  const currentGoods = goods.find((item) => item.id === +id);

  function handleAddCart() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <Container>
      {showModal && (
        <Modal>
          <Content>
            {!user ? (
              <>
                <p>로그인이 필요합니다</p>
                <p>로그인 페이지로 이동하시겠습니까?</p>
              </>
            ) : (
              <>
                <p>장바구니에 담았습니다</p>
                <p>장바구니 페이지로 이동하시겠습니까?</p>
              </>
            )}
          </Content>
          <LinkStyle to={'/login'}>확인</LinkStyle>
          <button onClick={handleCloseModal}>취소</button>
        </Modal>
      )}

      <ListLink to={'/goods'}>
        <FontAwesomeIcon icon={faAngleLeft} size='2x' />
        <span>목록으로</span>
      </ListLink>

      <Product>
        <img src={currentGoods.imgUrl} alt={currentGoods.title} />
        <Info>
          <Title>{currentGoods.title}</Title>
          <Category>{currentGoods.category}</Category>
          <p>{currentGoods.description}</p>
          <Price>가격 : {currentGoods.price}</Price>
          <Buttons>
            <button>
              <FontAwesomeIcon icon={faCreditCard} size='2x' />
            </button>
            <button onClick={handleAddCart}>
              <FontAwesomeIcon icon={faCartPlus} size='2x' />
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
`;

const Title = styled.h4`
  font-size: 30px;
  font-weight: bold;
`;

const Category = styled.p`
  opacity: 0.5;
`;

const Price = styled.p`
  font-size: 20px;
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

const Content = styled.div`
  line-height: 35px;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  opacity: 0.5;
  font-size: 20px;

  &:hover {
    opacity: 1;
  }

  &:visited {
    color: black;
    opacity: 0.5;
  }
`;

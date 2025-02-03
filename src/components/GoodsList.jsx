import styled from 'styled-components';
import { Modal } from './Modal';
import { useState } from 'react';
import { Link } from 'react-router';
import GoodsItem from './GoodsItem';

const GoodsList = ({ currentProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
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
      <Container>
        {currentProducts.map((item) => (
          <GoodsItem key={item.id} item={item} handleOpenModal={handleOpenModal} />
        ))}
      </Container>
    </>
  );
};

export default GoodsList;

const Container = styled.ul`
  width: 1280px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: auto;
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

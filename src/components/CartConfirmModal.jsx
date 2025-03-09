import { Modal } from "./Modal";
import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const CartConfirmModal = ({ user, handleCloseModal }) => {
  const page = user ? "/cart" : "/login";

  return (
    <Modal>
      <Content>
        {user ? (
          <>
            <p>장바구니에 담았습니다</p>
            <p>장바구니 페이지로 이동하시겠습니까?</p>
          </>
        ) : (
          <>
            <p>로그인이 필요합니다</p>
            <p>로그인 페이지로 이동하시겠습니까?</p>
          </>
        )}
      </Content>
      <LinkStyle to={`${page}`}>확인</LinkStyle>
      <button onClick={handleCloseModal}>취소</button>
    </Modal>
  );
};

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

export default CartConfirmModal;

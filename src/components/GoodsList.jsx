import styled from "styled-components";
import { useState } from "react";
import GoodsItem from "./GoodsItem";
import CartConfirmModal from "./CartConfirmModal";
import { addItemToCart } from "../api/cartAPI";

const GoodsList = ({ currentProducts, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postItemToCart = async (goodId, quantity) => {
    try {
      await addItemToCart(goodId, quantity);
      setApiMessage("장바구니에 담았습니다. \n 장바구니로 이동하시겠습니까?");
    } catch (err) {
      setApiMessage(
        "장바구니에 담는 것을 실패했습니다. \n 다시 시도해주십시오."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async (goodId, quantity) => {
    if (!user) {
      setShowModal(true);
      return;
    }

    try {
      await postItemToCart(goodId, quantity);
      setShowModal(true);
    } catch (err) {
      console.error("장바구니 추가 중 오류 발생:", err);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setApiMessage("");
  };

  return (
    <>
      {showModal && (
        <CartConfirmModal
          user={user}
          handleCloseModal={handleCloseModal}
          message={apiMessage}
        />
      )}
      <Container>
        {currentProducts.map((item) => (
          <GoodsItem
            key={item.id}
            item={item}
            handleOpenModal={handleOpenModal}
          />
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

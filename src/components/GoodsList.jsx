import styled from "styled-components";
import { useState } from "react";
import GoodsItem from "./GoodsItem";
import CartConfirmModal from "./CartConfirmModal";
import { addItemToCart } from "../api/cartAPI";

const GoodsList = ({ currentProducts, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [addedCartItem, setAddedCartItem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiMessage, setApiMessage] = useState(null);

  const postItemToCart = async (goodId, quantity) => {
    try {
      const cartItem = await addItemToCart(goodId, quantity);
      setAddedCartItem(cartItem);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // if (loading)  <p>로딩 중...</p>;
  // if (error) return <p>에러 발생: {error}</p>;
  // if (!addedCartItem.cartId) return <p>{addedCartItem.message}</p>;

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
    }
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <CartConfirmModal user={user} handleCloseModal={handleCloseModal} />
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

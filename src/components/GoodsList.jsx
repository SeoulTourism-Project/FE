import styled from "styled-components";
import { useState } from "react";
import GoodsItem from "./GoodsItem";
import CartConfirmModal from "./CartConfirmModal";

const GoodsList = ({ currentProducts, user }) => {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

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

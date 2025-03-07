import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { api } from "../utils/api";

const Cart = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const paymentSummaryRef = useRef(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
    fetchCartItems();
  }, []);

  // 장바구니 데이터 가져오기
  const fetchCartItems = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await api.get("/cart/check", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // 장바구니에 상품 추가
  const handleAddToCart = async (goodId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.post("/cart/add", {
        userId,
        goodId,
        quantity,
      });

      if (response.data.message) {
        setModalMessage(response.data.message);
        setShowModal(true);
        fetchCartItems();
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // 장바구니 수량 변경
  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await api.post("/cart/update", {
        cartId,
        quantity: newQuantity,
      });

      if (response.data.status === "Success") {
        setCartItems(response.data.cartList); // 최신 데이터 반영
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // 장바구니 상품 삭제
  const handleDeleteItem = async (cartId) => {
    try {
      const response = await api.delete(`/cart/delete/${cartId}`);
      if (response.data.message) {
        setModalMessage(response.data.message);
        setShowModal(true);
        setCartItems((prevCart) =>
          prevCart.filter((item) => item.cartId !== cartId)
        );
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // 상품 선택 핸들러
  const handleItemSelect = (cartId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(cartId)
        ? prevSelected.filter((id) => id !== cartId)
        : [...prevSelected, cartId]
    );
  };

  return (
    <CartContainer>
      <CartItems>
        <Header>장바구니</Header>
        <CartItemHeader>
          <div>상품명</div>
          <div>수량</div>
          <div>금액</div>
          <div>삭제</div>
        </CartItemHeader>
        {cartItems.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.cartId}>
              <CartItemName>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.cartId)}
                  onChange={() => handleItemSelect(item.cartId)}
                />
                <img
                  src={item.goodImage}
                  alt={item.goodName}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
                {item.goodName}
              </CartItemName>
              <CartItemQuantity>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.cartId, item.goodQuantity - 1)
                  }
                  disabled={item.goodQuantity <= 1}
                >
                  -
                </button>
                {item.goodQuantity}
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.cartId, item.goodQuantity + 1)
                  }
                >
                  +
                </button>
              </CartItemQuantity>
              <CartItemPrice>
                {item.goodPrice * item.goodQuantity} 원
              </CartItemPrice>
              <Button onClick={() => handleDeleteItem(item.cartId)}>
                삭제
              </Button>
            </CartItem>
          ))
        )}
      </CartItems>
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 1200px;
  margin: -10px auto;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
`;

const CartItems = styled.div`
  flex: 2;
  min-width: 600px;
`;

const Header = styled.h2`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CartItemName = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
`;

const CartItemPrice = styled.div`
  text-align: right;
  padding-right: 10px;
  width: 120px;
`;

const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  margin-right: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #333;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
<<<<<<< Updated upstream
import { api } from "../utils/api";
=======
import { authApi } from "../utils/authApi";
>>>>>>> Stashed changes

const Cart = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
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
<<<<<<< Updated upstream
    if (newQuantity < 1) return;

    try {
      const response = await api.post("/cart/update", {
        cartId,
        quantity: newQuantity,
      });

=======
    if (newQuantity < 1 || isUpdating) return;
    setIsUpdating(true);

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await authApi.post(
        "/cart/update",
        { cartId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
>>>>>>> Stashed changes
      if (response.data.status === "Success") {
        setCartItems(response.data.cartList); // 최신 데이터 반영
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // 장바구니 상품 삭제
  const handleDeleteItem = async (cartId) => {
<<<<<<< Updated upstream
    try {
      const response = await api.delete(`/cart/delete/${cartId}`);
      if (response.data.message) {
        setModalMessage(response.data.message);
        setShowModal(true);
        setCartItems((prevCart) =>
          prevCart.filter((item) => item.cartId !== cartId)
        );
      }
=======
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await authApi.delete(`/cart/delete/${cartId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCartItems((prevCart) =>
        prevCart.filter((item) => item.cartId !== cartId)
      );
>>>>>>> Stashed changes
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

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.cartId));
    }
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((cartId) => handleDeleteItem(cartId));
    setSelectedItems([]);
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
          <EmptyCartMessage>장바구니가 비어 있습니다.</EmptyCartMessage>
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
                  disabled={item.goodQuantity <= 1 || isUpdating}
                >
                  -
                </button>
                {item.goodQuantity}
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.cartId, item.goodQuantity + 1)
                  }
                  disabled={isUpdating}
                >
                  +
                </button>
              </CartItemQuantity>
              <CartItemPrice>
                {item.goodPrice * item.goodQuantity} 원
              </CartItemPrice>
              <Button
                onClick={() => handleDeleteItem(item.cartId)}
                disabled={isUpdating}
              >
                삭제
              </Button>
            </CartItem>
          ))
        )}
        <ActionButtons>
          <Button onClick={handleSelectAll}>전체 선택</Button>
          <Button
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          >
            선택 삭제
          </Button>
        </ActionButtons>
      </CartItems>

      {/* 결제 정보 섹션 */}
      <PaymentInfo>
        <h3>결제 정보</h3>
        <PaymentDetail>
          <span>주문 금액</span>
          <span>0 원</span>
        </PaymentDetail>
        <PaymentDetail>
          <span>배송비</span>
          <span>3,000 원</span>
        </PaymentDetail>
        <TotalAmount>
          <span>총 결제 금액</span>
          <span>3,000 원</span>
        </TotalAmount>
        <PaymentButton disabled>결제하기</PaymentButton>
      </PaymentInfo>
    </CartContainer>
  );
};

export default Cart;

<<<<<<< Updated upstream
// 스타일 컴포넌트
=======
// 스타일 코드
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  margin-right: 10px;
=======
>>>>>>> Stashed changes
  border-radius: 5px;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 20px;
`;

const PaymentInfo = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  background: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PaymentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;

const PaymentButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #333;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

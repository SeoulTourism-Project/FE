import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "상품명1",
      price: 10000,
      quantity: 0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "상품명2",
      price: 15000,
      quantity: 0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "상품명3",
      price: 20000,
      quantity: 0,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const paymentSummaryRef = useRef(null);

  // 페이지 이동을 위한 navigate 초기화
  const navigate = useNavigate();

  // 수량 증가 / 감소 함수
  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === "increment"
                ? item.quantity + 1
                : item.quantity > 0
                ? item.quantity - 1
                : item.quantity,
          }
        : item
    );
    setCartItems(updatedCart);
  };

  // 상품 선택/해제
  const handleItemSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  // 전체 선택 / 선택 삭제
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    const filteredItems = cartItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setCartItems(filteredItems);
    setSelectedItems([]);
  };

  // 결제 계산
  const calculateTotal = () => {
    const selected = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    const orderAmount = selected.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingFee = orderAmount >= 30000 ? 0 : 3000;
    const totalAmount = orderAmount + shippingFee;

    return { orderAmount, shippingFee, totalAmount };
  };

  const { orderAmount, shippingFee, totalAmount } = calculateTotal();

  // 결제하기 버튼 클릭 시 처리
  const handlePayment = () => {
    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }

    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    navigate("/checkout", {
      state: {
        orderItems: selectedProducts,
        orderAmount,
        shippingFee,
        totalAmount,
      },
    });
  };

  return (
    <CartContainer>
      {/* 왼쪽 - 장바구니 상품 목록 */}
      <CartItems>
        <Header>장바구니</Header>
        <CartItemHeader>
          <div>상품명</div>
          <div>수량</div>
          <div>금액</div>
        </CartItemHeader>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <CartItemName>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleItemSelect(item.id)}
              />
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
              {item.name}
            </CartItemName>
            <CartItemQuantity>
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, "decrement")}
                disabled={item.quantity <= 1}
              >
                -
              </QuantityButton>
              {item.quantity}
              <QuantityButton
                onClick={() => handleQuantityChange(item.id, "increment")}
              >
                +
              </QuantityButton>
            </CartItemQuantity>
            <CartItemPrice>{item.price * item.quantity} 원</CartItemPrice>
          </CartItem>
        ))}
        <ButtonsContainer>
          <Button onClick={handleSelectAll}>전체 선택</Button>
          <Button onClick={handleDeleteSelected}>선택 삭제</Button>
        </ButtonsContainer>
      </CartItems>

      {/* 오른쪽 - 결제 정보 */}
      <PaymentSummary ref={paymentSummaryRef}>
        <PaymentHeader>결제 정보</PaymentHeader>
        <CartItem>
          <CartItemName>주문 금액</CartItemName>
          <CartItemPrice>{orderAmount} 원</CartItemPrice>
        </CartItem>
        <CartItem>
          <CartItemName>배송비</CartItemName>
          <CartItemPrice>{shippingFee} 원</CartItemPrice>
        </CartItem>
        <CartItem>
          <CartItemName>
            <strong>총 결제 금액</strong>
          </CartItemName>
          <CartItemPrice>
            <strong>{totalAmount} 원</strong>
          </CartItemPrice>
        </CartItem>
        <Button onClick={handlePayment}>결제하기</Button>
      </PaymentSummary>
    </CartContainer>
  );
};
export default Cart;
// 스타일 컴포넌트들
const CartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
`;

const CartItems = styled.div`
  flex: 2;
  min-width: 600px;
`;

const PaymentSummary = styled.div`
  flex: 1;
  border-left: 1px solid #ddd;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 300px;
  height: auto;
  position: relative;
  margin-top: 250px;

  &:before {
    content: "";
    position: absolute;
    top: 280px;
    bottom: 0px;
    left: 0;
    width: 1px;
    background-color: #ddd;
  }
`;

const Header = styled.h2`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  font-size: 24px;
`;

const PaymentHeader = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
  font-size: 24px;
  padding-bottom: 3px;
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;

  & > div:nth-child(1) {
    margin-left: 60px;
  }

  & > div:nth-child(2) {
    margin-left: 180px;
  }

  & > div:nth-child(3) {
    margin-right: 20px;
  }
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
  text-align: center;
  flex: 1;
`;

const CartItemPrice = styled.div`
  text-align: right;
  padding-right: 10px;
  width: 120px;
`;

const ButtonsContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: #5555;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
  margin-right: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #3333;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const QuantityButton = styled(Button)`
  padding: 6px 12px;
  font-size: 14px;
  margin: 0 8px;
`;

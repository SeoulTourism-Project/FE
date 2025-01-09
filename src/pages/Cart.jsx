import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"; // styled-components 사용

const Cart = () => {
  // 상품 목록과 장바구니 상태
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "상품", price: 0, quantity: 1 },
    { id: 2, name: "상품", price: 0, quantity: 1 },
    { id: 3, name: "상품", price: 0, quantity: 1 },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  // 결제 정보 영역의 레퍼런스를 설정
  const paymentSummaryRef = useRef(null);

  // 수량 증가 / 감소 함수
  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === "increment"
                ? item.quantity + 1
                : item.quantity > 1
                ? item.quantity - 1
                : item.quantity, // 수량이 1 이하로 내려가지 않도록 조건 추가
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
    const shippingFee = orderAmount >= 50000 ? 0 : 3000;
    const totalAmount = orderAmount + shippingFee;

    return { orderAmount, shippingFee, totalAmount };
  };

  const { orderAmount, shippingFee, totalAmount } = calculateTotal();

  // 결제하기 버튼 클릭 시 처리
  const handlePayment = () => {
    alert(`총 결제 금액은 ${totalAmount}원입니다. 결제를 진행합니다.`);
  };

  // 결제 정보 영역 스크롤을 맨 오른쪽으로 이동
  useEffect(() => {
    if (paymentSummaryRef.current) {
      paymentSummaryRef.current.scrollLeft =
        paymentSummaryRef.current.scrollWidth;
    }
  }, [cartItems, selectedItems]); // cartItems와 selectedItems가 변경될 때마다 실행

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
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: flex-start; /* 세로 중앙 정렬 */
  min-height: 100vh; /* 화면 최소 높이를 100vh로 설정 */
  padding: 20px;
  gap: 20px; /* 왼쪽과 오른쪽 사이에 여백을 추가 */
  flex-wrap: wrap; /* 화면 크기에 맞게 내용이 줄어들 때 항목들이 아래로 내려가도록 설정 */
  overflow: auto; /* 전체 컨테이너에서 스크롤 허용 */
`;

const CartItems = styled.div`
  width: 60%; /* 가로 크기를 60%로 설정 */
  max-height: 80vh; /* 최대 높이를 화면의 80%로 제한 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  flex-grow: 0; /* 크기 자동 변화를 방지 */
  min-width: 300px; /* 최소 너비 설정 */
`;

const PaymentSummary = styled.div`
  width: 35%; /* 가로 크기를 35%로 설정 */
  border-left: 1px solid #ddd;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  flex-grow: 0; /* 크기 자동 변화를 방지 */
  justify-content: flex-start; /* 결제 정보를 상단으로 맞추기 */
  white-space: nowrap;
  min-width: 300px; /* 최소 너비 설정 */
  max-height: 80vh; /* 최대 높이를 화면의 80%로 제한 */
  overflow-y: auto; /* 세로 스크롤 추가 */
`;

const Header = styled.h2`
  height: 160px; /* 헤더 높이를 160px로 설정 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 0; /* 헤더와 위쪽 사이의 여백 제거 */
  font-size: 24px; /* 폰트 크기 설정 */
`;

const PaymentHeader = styled.h2`
  height: 170px; /* 결제 정보 높이를 170px로 설정 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 40px; /* 헤더와 위쪽 사이의 여백 제거 */
  font-size: 24px; /* 폰트 크기 설정 */
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
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
  width: 70%;
`;

const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItemPrice = styled.div`
  text-align: right;
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
  padding: 6px 12px; /* 동일한 패딩으로 버튼 크기 균일화 */
  font-size: 14px; /* 동일한 폰트 크기 */
  margin: 0 8px; /* 양쪽 간격 추가 */
`;

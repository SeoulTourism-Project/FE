import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"; // styled-components 사용

const Cart = () => {
  // 상품 목록과 장바구니 상태
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "상품명",
      price: 0,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "상품명",
      price: 0,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "상품명",
      price: 0,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
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
    const shippingFee = orderAmount >= 30000 ? 0 : 3000;
    const totalAmount = orderAmount + shippingFee;

    return { orderAmount, shippingFee, totalAmount };
  };

  const { orderAmount, shippingFee, totalAmount } = calculateTotal();

  // 결제하기 버튼 클릭 시 처리
  const handlePayment = () => {
    alert(`총 결제 금액은 ${totalAmount}원입니다. 결제를 진행합니다.`);
  };

  // 결제 정보 영역 스크롤을 맨 오른쪽으로 이동
  // 결제 정보 스크롤을 맨 오른쪽으로 이동
  useEffect(() => {
    if (paymentSummaryRef.current) {
      paymentSummaryRef.current.scrollLeft =
        paymentSummaryRef.current.scrollWidth;
    }
  }, [cartItems, selectedItems]); // cartItems 또는 selectedItems가 변경될 때마다 실행

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
  justify-content: flex-start; /* 가로 정렬을 시작점으로 변경 */
  align-items: flex-start; /* 세로 정렬을 시작점으로 설정 */
  max-width: 1200px; /* 장바구니 컨테이너 너비를 넓게 설정 */
  margin: 0 auto;
  padding: 20px;
  gap: 20px; /* 왼쪽과 오른쪽 사이에 여백을 추가 */
  flex-wrap: wrap; /* 화면 크기에 맞게 내용이 줄어들 때 항목들이 아래로 내려가도록 설정 */
  overflow: auto; /* 전체 컨테이너에서 스크롤 허용 */
`;

const CartItems = styled.div`
  flex: 2; /* 장바구니 항목을 더 넓게 설정 */
  min-width: 600px; /* 최소 너비를 넓게 설정 */
`;

const PaymentSummary = styled.div`
  flex: 1;
  border-left: 1px solid #ddd; /* 왼쪽 경계선 */
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start; /* 내용이 위쪽에 정렬 */
  min-width: 300px;
  height: auto; /* 높이를 자동 조정 */
  position: relative; /* 내부 요소를 기준으로 위치 설정 */
  margin-top: 250px; /* 결제 정보를 아래로 내리기 위해 위쪽 여백 추가 */

  &:before {
    content: "";
    position: absolute;
    top: 280px; /* 위쪽 시작점 */
    bottom: 0px; /* 아래쪽 끝까지 */
    left: 0; /* 왼쪽 경계선 위치 */
    width: 1px;
    background-color: #ddd; /* 경계선 색상 */
  }
`;

const Header = styled.h2`
  height: 160px; /* 헤더 높이를 160px로 설정 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 120px; /* 헤더와 위쪽 사이의 여백 제거 */
  font-size: 24px; /* 폰트 크기 설정 */
`;

const PaymentHeader = styled.h2`
  display: flex;
  justify-content: flex-start; /* 가로 정렬을 시작점으로 변경 */
  align-items: center; /* 세로 중앙 정렬 */
  margin: 20px; /* 헤더와 위쪽 사이의 여백 제거 */
  font-size: 24px; /* 폰트 크기 설정 */
  padding-bottom: 3px; /* 결제 정보와 금액 간 여백 추가 */
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between; /* 각 텍스트 간 간격 유지 */
  font-weight: bold;
  margin-bottom: 10px;

  & > div:nth-child(1) {
    margin-left: 60px; /* 상품명 글자를 오른쪽으로 이동 */
  }

  & > div:nth-child(2) {
    margin-left: 180px; /* 수량 글자를 오른쪽으로 이동 */
  }

  & > div:nth-child(3) {
    margin-right: 20px; /* 금액 글자를 왼쪽으로 이동 */
  }
`;
const CartItem = styled.div`
  display: flex;
  align-items: center; /* 항목 세로 정렬 */
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CartItemName = styled.div`
  display: flex;
  align-items: center;
  width: 50%; /* 이름 영역 크기 조정 */
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

const ItemImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: #e0e0e0;
`;

const ItemInfo = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

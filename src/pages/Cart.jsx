import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

const Cart = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const paymentSummaryRef = useRef(null);
  const userId = localStorage.getItem("userId");

  // 장바구니 데이터 가져오기 (GET /cart/check)
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cart/check");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
    fetchCartItems();
  }, []);

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/goods");
  };

  // 장바구니 상품 삭제 (API 요청)
  const handleDeleteItem = async (cartId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/cart/delete/${cartId}`
      );

      if (response.data.message) {
        setModalMessage(response.data.message);
        setShowModal(true);
        setCartItems((prevCart) =>
          prevCart.filter((item) => item.cartId !== cartId)
        ); // 삭제된 상품을 상태에서 제거
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // 상품 선택/해제
  const handleItemSelect = (cartId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(cartId)
        ? prevSelected.filter((id) => id !== cartId)
        : [...prevSelected, cartId]
    );
  };

  // 전체 선택 / 선택 해제
  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length
        ? []
        : cartItems.map((item) => item.cartId)
    );
  };

  // 선택한 상품 삭제
  const handleDeleteSelected = async () => {
    for (const cartId of selectedItems) {
      await handleDeleteItem(cartId);
    }
    setSelectedItems([]);
  };

  // 결제 금액 계산
  const calculateTotal = () => {
    const selected = cartItems.filter((item) =>
      selectedItems.includes(item.cartId)
    );
    const orderAmount = selected.reduce(
      (acc, item) => acc + item.goodPrice * item.goodQuantity,
      0
    );
    const shippingFee = orderAmount >= 30000 ? 0 : 3000;
    const totalAmount = orderAmount + shippingFee;

    return { orderAmount, shippingFee, totalAmount };
  };

  const { orderAmount, shippingFee, totalAmount } = calculateTotal();

  // 결제하기 버튼 클릭
  const handlePayment = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (paymentSummaryRef.current) {
      paymentSummaryRef.current.scrollLeft =
        paymentSummaryRef.current.scrollWidth;
    }
  }, [cartItems, selectedItems]);

  return (
    <CartContainer>
      {/* 장바구니 목록 */}
      <CartItems>
        <Header>장바구니</Header>
        <CartItemHeader>
          <div>상품명</div>
          <div>수량</div>
          <div>금액</div>
          <div>삭제</div>
        </CartItemHeader>
        {cartItems.map((item) => (
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
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
              {item.goodName}
            </CartItemName>
            <CartItemQuantity>{item.goodQuantity}</CartItemQuantity>
            <CartItemPrice>
              {item.goodPrice * item.goodQuantity} 원
            </CartItemPrice>
            <Button onClick={() => handleDeleteItem(item.cartId)}>삭제</Button>
          </CartItem>
        ))}
        <ButtonsContainer>
          <Button onClick={handleSelectAll}>전체 선택</Button>
          <Button onClick={handleDeleteSelected}>선택 삭제</Button>
        </ButtonsContainer>
      </CartItems>

      {/* 결제 정보 */}
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

      {showModal && (
        <Modal>
          <p>{modalMessage}</p>
          <button onClick={handleConfirm}>확인</button>
        </Modal>
      )}
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
  margin: -10px auto; /* 장바구니 지체를 위로 이동 */
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
  margin-top: 70px; /* 70px으로 조정하여 왼쪽 금액란과 높이 맞추기 */

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
  height: 90px; /* 헤더 높이를 140px로 설정 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin-top: 0px; /* 헤더와 위쪽 사이의 여백 제거 */
  font-size: 26px; /* 폰트 크기 설정 */
  font-weight: bold; /* 글씨체를 더 진하게 설정 */
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
    margin-left: 140px; /* 수량 글자를 오른쪽으로 이동 */
  }

  & > div:nth-child(3) {
    margin-right: 40px; /* 금액 글자를 왼쪽으로 이동 */
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
  text-align: right; /* 텍스트를 오른쪽 정렬 */
  padding-right: 10px; /* 오른쪽으로 약간 이동 */
  width: 120px; /* 텍스트 영역 크기를 유지 */
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

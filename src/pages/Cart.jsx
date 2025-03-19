import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { authApi } from "../utils/authApi";

const Cart = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(3000);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
    fetchCartItems();
  }, []);

  useEffect(() => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.cartId)
    );

    const newOrderAmount = selectedProducts.reduce(
      (acc, item) => acc + item.goodPrice * item.goodQuantity,
      0
    );
    setOrderAmount(newOrderAmount);

    const newShippingFee = newOrderAmount >= 30000 ? 0 : 3000;
    setShippingFee(newShippingFee);

    setTotalAmount(newOrderAmount + newShippingFee);
  }, [cartItems, selectedItems]);

  const fetchCartItems = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await authApi.get("/cart/check", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.cartId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;

    const accessToken = sessionStorage.getItem("accessToken");
    try {
      await Promise.all(
        selectedItems.map((cartId) =>
          authApi.delete(`/cart/delete/${cartId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        )
      );
      setCartItems((prevCart) =>
        prevCart.filter((item) => !selectedItems.includes(item.cartId))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting selected cart items:", error);
    }
  };

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.cartId)
    );

    navigate("/checkout", {
      state: {
        items: selectedProducts,
        orderAmount,
        shippingFee,
        totalAmount,
      },
    });
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
                  onChange={() =>
                    setSelectedItems((prevSelected) =>
                      prevSelected.includes(item.cartId)
                        ? prevSelected.filter((id) => id !== item.cartId)
                        : [...prevSelected, item.cartId]
                    )
                  }
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
              <CartItemPrice>
                {item.goodPrice * item.goodQuantity} 원
              </CartItemPrice>
            </CartItem>
          ))
        )}

        <ActionButtonsContainer>
          <Button onClick={handleSelectAll}>전체 선택</Button>
          <Button
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          >
            선택 삭제
          </Button>
        </ActionButtonsContainer>
      </CartItems>

      <PaymentInfo>
        <h3>결제 정보</h3>
        <PaymentDetail>
          <span>주문 금액</span>
          <span>{orderAmount.toLocaleString()} 원</span>
        </PaymentDetail>
        <PaymentDetail>
          <span>배송비</span>
          <span>{shippingFee.toLocaleString()} 원</span>
        </PaymentDetail>
        <TotalAmount>
          <span>총 결제 금액</span>
          <span>{totalAmount.toLocaleString()} 원</span>
        </TotalAmount>
        <PaymentButton disabled={orderAmount === 0} onClick={handleCheckout}>
          결제하기
        </PaymentButton>
      </PaymentInfo>
    </CartContainer>
  );
};

export default Cart;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
  margin-left: 10px;
`;

const CartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch; /* 두 개의 박스를 같은 높이로 맞춤 */
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
  align-self: center;
  margin-top: -520px;
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

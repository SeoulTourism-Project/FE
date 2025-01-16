import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProductList = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductName = styled.div`
  font-size: 16px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #ccc;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }

  &:disabled {
    background-color: #eee;
    cursor: not-allowed;
  }
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const TotalContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.div`
  font-size: 18px;
  color: #4caf50;
  margin-top: 20px;
`;

// Component
function Checkout() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: 10000, quantity: 1 },
    { id: 2, name: "Product B", price: 15000, quantity: 2 },
    { id: 3, name: "Product C", price: 20000, quantity: 1 },
  ]);

  const [isCheckoutComplete, setCheckoutComplete] = useState(false);

  const handleIncrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
  };

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <PageContainer>
      <Title>결제 페이지</Title>
      <ProductList>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductName>{product.name}</ProductName>
            <QuantityContainer>
              <Button
                onClick={() => handleDecrease(product.id)}
                disabled={product.quantity === 1}
              >
                -
              </Button>
              <div>{product.quantity}</div>
              <Button onClick={() => handleIncrease(product.id)}>+</Button>
            </QuantityContainer>
            <Price>{product.price * product.quantity} 원</Price>
          </ProductItem>
        ))}
      </ProductList>
      <TotalContainer>
        <div>총 금액</div>
        <div>{totalPrice} 원</div>
      </TotalContainer>
      <CheckoutButton onClick={handleCheckout}>결제하기</CheckoutButton>
      {isCheckoutComplete && <Message>결제가 완료되었습니다!</Message>}
    </PageContainer>
  );
}

export default Checkout;

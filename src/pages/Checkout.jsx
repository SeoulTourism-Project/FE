import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProducts = Array.isArray(location.state?.selectedProducts)
    ? location.state.selectedProducts
    : [];

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const shippingFee = totalPrice > 30000 ? 0 : totalPrice > 0 ? 3000 : 0;
  const finalPrice = totalPrice + shippingFee;

  const [formData, setFormData] = useState({
    impUid: "",
    merchantUid: `order_${Date.now()}`,
    paymentCard: "",
    totalAmount: finalPrice,
    paymentMethod: "카드",
  });

  const [errors, setErrors] = useState({});
  const [paymentResult, setPaymentResult] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.paymentCard.trim()) {
      newErrors.paymentCard = "결제 카드 정보를 입력하세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(`${API_URL}/payment/process`, formData);
      const { impUid, message, totalAmount } = response.data;

      if (impUid) {
        setPaymentResult({ impUid, message, totalAmount });
      } else {
        alert(`결제 실패: ${message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error(
        "❌ 결제 요청 오류:",
        error.response?.data || error.message
      );
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleNavigate = useCallback(() => {
    if (paymentResult) {
      alert("결제가 성공적으로 완료되었습니다!");
      navigate("/mypage");
    }
  }, [paymentResult, navigate]);

  useEffect(() => {
    handleNavigate();
  }, [paymentResult, handleNavigate]);

  return (
    <Container>
      <Header>Check Out</Header>

      <Section>
        <Title>주문 리스트</Title>
        {selectedProducts.length > 0 ? (
          <ProductList>
            {selectedProducts.map((product) => (
              <ProductItem key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <div className="name">{product.name}</div>
                  <div>{product.quantity}개</div>
                  <div>
                    {(product.quantity * product.price).toLocaleString()} 원
                  </div>
                </div>
              </ProductItem>
            ))}
          </ProductList>
        ) : (
          <ErrorMessage>결제할 상품이 없습니다.</ErrorMessage>
        )}
      </Section>

      <Divider />

      <Section>
        <Title>결제 정보</Title>
        <FormGroup>
          <label htmlFor="paymentCard">결제 카드 정보</label>
          <input
            type="text"
            id="paymentCard"
            placeholder="카드 정보를 입력하세요"
            value={formData.paymentCard}
            onChange={handleChange}
          />
          {errors.paymentCard && (
            <ErrorMessage>{errors.paymentCard}</ErrorMessage>
          )}
        </FormGroup>
      </Section>

      <Divider />

      <CheckoutButton
        onClick={handleSubmit}
        disabled={selectedProducts.length === 0}
      >
        {finalPrice.toLocaleString()} 원 결제하기
      </CheckoutButton>

      {paymentResult && (
        <PaymentResultBox>
          <p>결제가 완료되었습니다!</p>
          <p>결제 번호: {paymentResult.impUid}</p>
          <p>결제 금액: {paymentResult.totalAmount.toLocaleString()} 원</p>
        </PaymentResultBox>
      )}
    </Container>
  );
};

export default CheckoutPage;

// 스타일 컴포넌트 정리
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 50%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ProductList = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 5px;
  }

  .details {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    font-weight: bold;
  }
`;

const CheckoutButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#555")};
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 20px;
  transition: background 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#333")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const PaymentResultBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

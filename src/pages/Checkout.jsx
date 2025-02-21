import React, { useState, useEffect, useMemo } from "react";
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

  const totalProductPrice = useMemo(() => {
    return selectedProducts.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
  }, [selectedProducts]);

  const shippingFee = useMemo(() => {
    return totalProductPrice > 30000 ? 0 : totalProductPrice > 0 ? 3000 : 0;
  }, [totalProductPrice]);

  const finalAmount = useMemo(
    () => totalProductPrice + shippingFee,
    [totalProductPrice, shippingFee]
  );

  const [formData, setFormData] = useState({
    impUid: "",
    merchantUid: `order_${Date.now()}`,
    paymentCard: "",
    totalAmount: finalAmount,
    paymentMethod: "카드",
    name: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, totalAmount: finalAmount }));
  }, [finalAmount]);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    const fieldName = id || name; // `select` 요소는 `id`가 없을 수 있음

    let newValue = value;
    if (fieldName === "phoneNumber") {
      newValue = value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
    }

    setFormData((prev) => ({ ...prev, [fieldName]: newValue }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "이름을 입력하세요.";

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "전화번호를 입력하세요.";
    } else if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "유효한 전화번호를 입력하세요. (10~11자리 숫자)";
    }

    if (!formData.address.trim()) newErrors.address = "숙소 주소를 입력하세요.";

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

  useEffect(() => {
    if (paymentResult) {
      alert("결제가 성공적으로 완료되었습니다!");
      navigate("/mypage");
    }
  }, [paymentResult, navigate]);

  // ✅ Form 컴포넌트 직접 정의
  const Form = ({ children, ...props }) => {
    return <form {...props}>{children}</form>;
  };

  return (
    <Container>
      <Header>상품 B</Header>

      <Section>
        <Title>주문자 정보</Title>
        <Form>
          <FormGroup>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="전화번호를 입력하세요"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength="11"
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="address">숙소 주소</label>
            <input
              type="text"
              id="address"
              placeholder="숙소 주소를 입력하세요"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormGroup>
        </Form>
      </Section>

      <CheckoutButton
        onClick={handleSubmit}
        disabled={selectedProducts.length === 0}
      >
        {finalAmount.toLocaleString()}원 결제하기
      </CheckoutButton>
    </Container>
  );
};

export default CheckoutPage;

// ✅ 스타일 컴포넌트
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

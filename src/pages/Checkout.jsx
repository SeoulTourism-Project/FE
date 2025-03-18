import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import PaymentResult from "../components/PaymentResult";

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

  useEffect(() => {
    if (!window.IMP) {
      console.error(
        "IMP 객체가 로드되지 않았습니다. 스크립트 추가를 확인하세요."
      );
    } else {
      window.IMP.init("imp04760523");
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    const fieldName = id || name;
    let newValue = value;
    if (fieldName === "phoneNumber") {
      newValue = value.replace(/\D/g, "");
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

  const createOrder = async () => {
    try {
      const response = await axios.post(`${API_URL}/orders/create`, {
        cartItemIds: selectedProducts.map((product) => product.id),
        deliveryInfo: {
          mainAddress: formData.address,
          detailAddress: "",
          zipCode: "12345",
          receiverName: formData.name,
          receiverPhone: formData.phoneNumber,
        },
      });
      return response.data.orderId;
    } catch (error) {
      console.error("주문 생성 실패:", error);
      alert("주문 생성에 실패했습니다.");
      return null;
    }
  };

  const processPayment = async (orderId, impUid) => {
    try {
      const response = await axios.post(`${API_URL}/payment/process`, {
        userId: 14,
        orderId,
        impUid,
        merchantUid: formData.merchantUid,
        paymentCard: formData.paymentCard,
        totalAmount: finalAmount,
        paymentMethod: formData.paymentMethod,
      });

      alert("결제가 완료되었습니다!");
      navigate("/mypage");
    } catch (error) {
      console.error("결제 처리 실패:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    }
  };

  const requestPayment = async () => {
    if (!validate()) return;
    if (!window.IMP) {
      alert("결제 모듈이 로드되지 않았습니다. 새로고침 해주세요.");
      return;
    }

    const orderId = await createOrder();
    if (!orderId) return;

    const IMP = window.IMP;
    IMP.request_pay(
      {
        pg: "nice",
        pay_method: "vbank",
        merchant_uid: formData.merchantUid,
        name: "테스트 상품",
        amount: finalAmount,
        buyer_name: formData.name,
        buyer_tel: formData.phoneNumber,
        buyer_addr: formData.address,
        buyer_postcode: "",
      },
      async (response) => {
        if (response.success) {
          setPaymentResult(response);
          await processPayment(orderId, response.imp_uid);
        } else {
          alert(`❌ 결제 실패: ${response.error_msg}`);
        }
      }
    );
  };

  return (
    <Container>
      <Header>결제 페이지</Header>
      <CheckoutButton
        onClick={requestPayment}
        disabled={selectedProducts.length === 0}
      >
        {finalAmount.toLocaleString()}원 결제하기
      </CheckoutButton>

      {paymentResult && (
        <PaymentResult
          message={paymentResult.message}
          impUid={paymentResult.impUid}
          totalAmount={paymentResult.totalAmount}
        />
      )}
    </Container>
  );
};

export default CheckoutPage;

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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

import React, { useState } from "react";
import styled from "styled-components";
import PaymentDetails from "./paymentHistory/PaymentDetails";

const PaymentHistory = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <Container>
      {paymentInfoList.map((payment) => (
        <PaymentBlock key={payment.paymentId}>
          {/* 결제 ID & 구매 날짜 */}
          <PaymentHeader>
            <p>결제 ID: {payment.paymentId}</p>
            <p>구매 날짜: {payment.date}</p>
          </PaymentHeader>

          {/* 구매자 정보 (이름, 주소, 전화번호) */}
          <BuyerInfo>
            <p>
              <strong>구매자:</strong> {payment.buyer}
            </p>
            <p>
              <strong>주소:</strong> {payment.address}
            </p>
            <p>
              <strong>전화번호:</strong> {payment.phone}
            </p>
          </BuyerInfo>

          {/* 결제 상품 요약 */}
          <Summary>
            <p>{payment.summary}</p>
            <MoreButton
              onClick={() =>
                setSelectedPayment(
                  selectedPayment === payment.paymentId
                    ? null
                    : payment.paymentId
                )
              }
            >
              결제 상품{" "}
              {selectedPayment === payment.paymentId ? "닫기" : "더보기"}
            </MoreButton>
          </Summary>

          {/* 더보기 클릭 시 상세 정보 표시 */}
          {selectedPayment === payment.paymentId && (
            <PaymentDetails payment={payment} />
          )}
        </PaymentBlock>
      ))}
    </Container>
  );
};

/* --- Styled Components --- */
const Container = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background: #fafafa;
`;

const PaymentBlock = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
`;

const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const BuyerInfo = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  p {
    margin: 5px 0;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-top: 10px;
`;

const MoreButton = styled.button`
  background: #000;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const paymentInfoList = [
  {
    paymentId: "123456",
    date: "2025-01-01",
    buyer: "OOO 님",
    address: "경상남도 창원시 의창구 ...",
    phone: "010-1234-5678",
    summary: "상품 A 외 2건",
    totalAmount: 150000,
    shippingFee: 3000,
    finalAmount: 153000,
    products: [
      {
        productId: 1,
        image: "/images/ddp.jpg",
        name: "상품 A",
        quantity: 1,
        price: 50000,
        shipping: "배송중",
      },
      {
        productId: 2,
        image: "/images/dummyImage.jpg",
        name: "상품 B",
        quantity: 2,
        price: 100000,
        shipping: "배송 준비중",
      },
    ],
  },
  {
    paymentId: "789012",
    date: "2025-01-05",
    buyer: "김철수",
    address: "서울특별시 강남구 ...",
    phone: "010-5678-1234",
    summary: "상품 C 외 1건",
    totalAmount: 200000,
    shippingFee: 5000,
    finalAmount: 205000,
    products: [
      {
        productId: 3,
        image: "/images/gyeongbokgung.jpg",
        name: "상품 C",
        quantity: 1,
        price: 120000,
        shipping: "배송 완료",
      },
      {
        productId: 4,
        image: "/images/dummyImage.jpg",
        name: "상품 D",
        quantity: 1,
        price: 80000,
        shipping: "배송중",
      },
    ],
  },
  {
    paymentId: "345678",
    date: "2025-01-10",
    buyer: "이영희",
    address: "부산광역시 해운대구 ...",
    phone: "010-9876-5432",
    summary: "상품 E 외 3건",
    totalAmount: 300000,
    shippingFee: 7000,
    finalAmount: 307000,
    products: [
      {
        productId: 5,
        image: "/images/dummyImage.jpg",
        name: "상품 E",
        quantity: 1,
        price: 90000,
        shipping: "배송중",
      },
      {
        productId: 6,
        image: "/images/dummyImage.jpg",
        name: "상품 F",
        quantity: 1,
        price: 70000,
        shipping: "배송 준비중",
      },
      {
        productId: 7,
        image: "/images/dummyImage.jpg",
        name: "상품 G",
        quantity: 2,
        price: 140000,
        shipping: "배송 완료",
      },
    ],
  },
];
export default PaymentHistory;

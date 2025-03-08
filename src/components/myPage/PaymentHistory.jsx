import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PaymentDetails from "./paymentHistory/PaymentDetails";
import { fetchPaymentHistory } from "../../api/paymentHistoryAPI";

const PaymentHistory = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPaymentHistory = async () => {
      try {
        const data = await fetchPaymentHistory();
        setPaymentHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPaymentHistory();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;
  if (!paymentHistory) return <p>결제 내역을 불러올 수 없습니다.</p>;

  return (
    <>
      {paymentHistory.length === 0 ? (
        <p>결제 내역이 없습니다.</p>
      ) : (
        <Container>
          {paymentHistory.map((payment) => (
            <PaymentCard key={payment.paymentId}>
              <PaymentHeader>
                <p>
                  🛒 주문 번호: <strong>{payment.paymentId}</strong>
                </p>
                <p className="date">📅 구매 날짜: {payment.date}</p>
              </PaymentHeader>

              <BuyerInfo>
                <p>
                  <span className="icon">👤</span>
                  <strong>구매자:</strong> {payment.buyer} 님
                </p>
                <p>
                  <span className="icon">📞</span>
                  <strong>전화번호:</strong> {payment.phone}
                </p>
                <p>
                  <span className="icon">📍</span>
                  <strong>주소:</strong> {payment.address}
                </p>
              </BuyerInfo>

              <Summary>
                <p>🛍 {payment.summary}</p>
                <MoreButton
                  onClick={() =>
                    setSelectedPayment(
                      selectedPayment === payment.paymentId
                        ? null
                        : payment.paymentId
                    )
                  }
                >
                  {selectedPayment === payment.paymentId
                    ? "▲ 닫기"
                    : "▼ 더보기"}
                </MoreButton>
              </Summary>

              {selectedPayment === payment.paymentId && (
                <PaymentDetails payment={payment} />
              )}
            </PaymentCard>
          ))}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background: #f9f9f9;
`;

const PaymentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;

  .date {
    color: #888;
    font-weight: normal;
  }
`;

const BuyerInfo = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin: 15px 0;
  font-size: 15px;

  p {
    display: flex;
    align-items: center;
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  strong {
    width: 90px;
    display: inline-block;
    color: #555;
  }

  .icon {
    margin-right: 8px;
    font-size: 16px;
    color: #555;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 15px;
  padding-top: 10px;
`;

const MoreButton = styled.button`
  background: #aaa;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #000;
  }
`;

const paymentInfoList = [
  {
    paymentId: "123456",
    date: "2025-01-01",
    buyer: "OOO",
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
        name: "전통 나무젓가락 세트",
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

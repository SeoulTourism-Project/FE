import React from "react";
import styled from "styled-components";

const PaymentResult = ({ message, impUid, totalAmount }) => {
  return (
    <Container>
      <h2>결제 결과</h2>
      <p>
        <strong>결과 메시지:</strong> {message}
      </p>
      <p>
        <strong>결제 인증 번호(impUid):</strong> {impUid}
      </p>
      <p>
        <strong>총 결제 금액:</strong> {totalAmount.toLocaleString()} 원
      </p>
    </Container>
  );
};

export default PaymentResult;

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
`;

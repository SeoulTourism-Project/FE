import React from "react";
import styled from "styled-components";
import ProductTable from "./ProductTable";

const PaymentDetails = ({ payment }) => {
  return (
    <DetailsSection>
      <Title>💳 결제 상세 정보</Title>

      {/* 상품 정보 */}
      <ProductTable products={payment.products} />

      {/* 결제 금액 */}
      <TotalSection>
        <p>총 금액: {payment.totalAmount.toLocaleString()}원</p>
        <p>+</p>
        <p>배송비: {payment.shippingFee.toLocaleString()}원</p>
        <p>=</p>
        <p class="finalAmount">
          <strong>결제 금액: {payment.finalAmount.toLocaleString()}원</strong>
        </p>
      </TotalSection>
    </DetailsSection>
  );
};

const DetailsSection = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-top: 20px;

  .finalAmount {
    font-weight: bold;
  }
`;

export default PaymentDetails;

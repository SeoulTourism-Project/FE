import React from "react";
import styled from "styled-components";
import ProductTable from "./ProductTable"; // 상품 테이블 import

const PaymentDetails = ({ payment }) => {
  return (
    <DetailsSection>
      {/* 상품 테이블 */}
      <ProductTable products={payment.products} />

      {/* 결제 요약 */}
      <TotalSection>
        <p>총 금액: {payment.totalAmount.toLocaleString()}원</p>
        <p>배송비: {payment.shippingFee.toLocaleString()}원</p>
        <p>
          <strong>결제 금액: {payment.finalAmount.toLocaleString()}원</strong>
        </p>
      </TotalSection>
    </DetailsSection>
  );
};

/* --- Styled Components --- */
const DetailsSection = styled.div`
  margin-top: 10px;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  font-weight: bold;
  border-top: 1px solid #ddd;
  margin-top: 10px;
`;

export default PaymentDetails;

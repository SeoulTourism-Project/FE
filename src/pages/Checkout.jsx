import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router"; //useNavigate 추가
import axios from "axios";
import PaymentResult from "../components/PaymentResult";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); //페이지 이동을 위한 navigate 추가
  const selectedProducts = location.state?.selectedProducts || [];

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const shippingFee = totalPrice <= 30000 ? 3000 : 0;
  const finalPrice = totalPrice + shippingFee;

  const [formData, setFormData] = useState({
    userId: 14,
    orderId: 8,
    impUid: null,
    merchantUid: "order_123",
    paymentCard: "1234-5678-9876-5432",
    totalAmount: finalPrice,
    paymentMethod: "카드",
  });

  const [errors, setErrors] = useState({});
  const [paymentResult, setPaymentResult] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.impUid) {
      newErrors.impUid = "결제 인증 번호(impUid)를 입력하세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    axios
      .post("http://localhost:8080/payment/process", formData)
      .then((response) => {
        const { impUid, message, totalAmount } = response.data || {};

        setPaymentResult({ impUid, message, totalAmount });

        if (impUid) {
          setFormData((prevData) => ({
            ...prevData,
            impUid,
          }));

          alert("결제가 성공적으로 완료되었습니다!");

          //결제 성공 후 마이페이지로 이동
          navigate("/mypage");
        } else {
          alert(`결제 실패: ${message || "알 수 없는 오류"}`);
        }
      })
      .catch((error) => {
        console.error("결제 요청 중 오류 발생:", error);
        alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

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
                  <div>{product.price.toLocaleString()} 원</div>
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
          <label htmlFor="impUid">결제 인증 번호 (impUid)</label>
          <input
            type="text"
            id="impUid"
            placeholder="impUid를 입력하세요"
            value={formData.impUid || ""}
            onChange={handleChange}
          />
          {errors.impUid && <ErrorMessage>{errors.impUid}</ErrorMessage>}
        </FormGroup>
      </Section>

      <Divider />

      <CheckoutButton onClick={handleSubmit}>
        {finalPrice.toLocaleString()} 원 결제하기
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

// 스타일 컴포넌트
const OrderSummary = styled.table`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px; /* 테이블과 결제하기 버튼 사이 간격 추가 */
  border-collapse: collapse;
  text-align: center;

  th {
    background-color: #ddd;
    border: 1px solid #ddd;
    padding: 10px;
  }

  td {
    border: 1px solid #ddd;
    padding: 10px;
  }
`;

const FinalAmount = styled.span`
  color: black; /* 색상을 검은색으로 변경 */
  font-weight: bold;
  font-size: 1.2rem;
`;
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
  margin-bottom: 60px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0; /* 위아래 여백 설정 */
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
  margin-top: 30px; /* 이름 필드 위에 간격 추가 */

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
  #name {
    width: 40%;
  }
  #address {
    width: 60%;
  }
`;

const ProductList = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 5px;
  }
  .details {
    flex: 1;
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    align-items: center;

    .name {
      font-weight: bold;
      margin-right: 180px; /* 수량 입력 박스와 간격 조정 */
    }
    .quantity {
      color: #555;
    }
    input {
      width: 50px; /* 수량 입력 박스의 너비를 절반으로 줄임 */
      margin-left: 5px;
      margin-right: 80px; /* 버튼과 금액 사이 간격 */
      padding: 5px; /* 입력 필드 내부 패딩 조정 */
      font-size: 1rem;
      text-align: center; /* 입력 값 중앙 정렬 */
    }
  }
`;

const Summary = styled.div`
  text-align: right;
  font-size: 1rem;

  .total {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const AgreementSection = styled.div`
  margin: 40px 0 20px 0; /* 위쪽 여백을 늘리고 아래쪽 여백을 추가 */
  font-size: 0.9rem;
  color: black;

  p {
    margin: 5px 0;
  }
`;
const PaymentMethod = styled.div`
  margin: 20px 0; /* 위아래 여백 추가 */
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const CheckoutButton = styled.button`
  background-color: #5555;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px; /* 테이블과 버튼 사이 간격을 설정 */

  &:hover {
    background-color: #3333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const FinalPriceTitle = styled.h2`
  text-align: left; /* 왼쪽 정렬 */
  font-size: 1.2rem;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

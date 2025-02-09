import React, { useState } from "react";
import styled from "styled-components";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "",
    products: [
      {
        id: 1,
        name: "상품 A",
        image: "https://via.placeholder.com/200",
        quantity: 0,
        price: 0,
      },
      {
        id: 2,
        name: "상품 B",
        image: "https://via.placeholder.com/200",
        quantity: 0,
        price: 0,
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products];
    const newValue = Math.max(0, Number(value)); // 입력값이 0 이상인지 검증
    updatedProducts[index][field] = newValue;
    setFormData({ ...formData, products: updatedProducts });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "이름을 입력하세요.";
    }
    if (!formData.phone) {
      newErrors.phone = "전화번호를 입력하세요.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "유효한 전화번호를 입력하세요 (10-11자리 숫자).";
    }
    if (!formData.address) {
      newErrors.address = "숙소 주소를 입력하세요.";
    }
    formData.products.forEach((product, index) => {
      if (product.quantity <= 0) {
        newErrors[`product-${index}`] = "수량을 1 이상 입력하세요.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("결제가 완료되었습니다!");
      // 결제 처리 로직 추가
    }
  };

  const totalPrice = formData.products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const shippingFee = totalPrice <= 30000 ? 3000 : 0;
  const finalPrice = totalPrice + shippingFee; // 총 결제 금액 계산

  return (
    <Container>
      <Header>check out</Header>

      {/* 주문 리스트 */}
      <Section>
        <Title>주문 리스트</Title>
        <ProductList>
          {formData.products.map((product, index) => (
            <ProductItem key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <div className="name">{product.name}</div>
                <input
                  type="number"
                  min="0" // 최소값 0 설정
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(index, "quantity", e.target.value)
                  }
                  placeholder="수량"
                />
                {errors[`product-${index}`] && (
                  <ErrorMessage>{errors[`product-${index}`]}</ErrorMessage>
                )}
              </div>
              <div>{product.price.toLocaleString()} 원</div>
            </ProductItem>
          ))}
        </ProductList>
      </Section>

      {/* 경계선 추가 */}
      <Divider className="black-divider" />

      {/* 주문자 정보 */}
      <Section>
        <Title>주문자 정보</Title>
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
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            id="phone"
            placeholder="전화번호를 입력하세요"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
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
      </Section>

      {/* 경계선 추가 */}
      <Divider className="black-divider" />

      {/* 결제수단 */}
      <PaymentMethod>
        <label htmlFor="payment">결제수단</label>
      </PaymentMethod>

      {/* 경계선 추가 */}
      <Divider className="black-divider" />

      {/* 최종 결제 금액 텍스트 */}
      <FinalPriceTitle>최종 결제 금액</FinalPriceTitle>

      {/* 주문상품  테이블 */}
      <OrderSummary>
        <thead>
          <tr>
            <th>상품금액</th>
            <th>배송비</th>
            <th>추가금액</th>
            <th>결제 예정금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalPrice.toLocaleString()}원</td>
            <td>
              {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
            </td>
            <td>0원</td>
            <td>
              <FinalAmount>{finalPrice.toLocaleString()}원</FinalAmount>
            </td>
          </tr>
        </tbody>
      </OrderSummary>

      {/* 경계선 */}
      <Divider className="black-divider" />

      <AgreementSection>
        <p>주문 내용을 확인했으며 결제에 동의합니다.</p>
        <p>회원님의 개인정보는 안전하게 관리됩니다.</p>
      </AgreementSection>

      {/* 결제하기 버튼 */}
      <CheckoutButton onClick={handleSubmit}>
        {finalPrice.toLocaleString()} 원 결제하기
      </CheckoutButton>
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

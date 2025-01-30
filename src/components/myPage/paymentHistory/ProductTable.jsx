import React from "react";
import styled from "styled-components";

const ProductTable = ({ products }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th className="image-column">상품 이미지</th>
          <th className="name-column">상품명</th>
          <th>수량</th>
          <th>가격</th>
          <th className="shipping-column">배송 상태</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.productId}>
            <td className="image-column">
              <Image src={product.image} alt={product.name} />
            </td>
            <td className="name-column">{product.name}</td>
            <td>{product.quantity}개</td>
            <td>{product.price.toLocaleString()}원</td>
            <td className="shipping-column">{product.shipping}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

/* --- Styled Components --- */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    height: 200px;
    vertical-align: middle;
  }

  th {
    background: #f8f8f8;
    height: 30px;
  }

  .image-column {
    width: 20%;
  }

  .name-column {
    width: 40%;
  }

  .shipping-column {
    width: 15%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

export default ProductTable;

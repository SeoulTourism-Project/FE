import React from "react";
import styled from "styled-components";

const ProductTable = ({ products }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th className="image-column">상품</th>
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
            <td className={`status ${getStatusClass(product.shipping)}`}>
              {product.shipping}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const getStatusClass = (status) => {
  if (status.includes("배송 완료")) return "completed";
  if (status.includes("배송중")) return "in-progress";
  return "pending";
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;

  th,
  td {
    border-bottom: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    vertical-align: middle;
    height: 150px;
  }

  th {
    background: #f7f9fa;
    height: 30px;
  }

  .status {
    font-weight: bold;
    padding: 5px 8px;
    border-radius: 6px;
  }

  .image-column {
    width: 20%;
  }

  .name-column {
    background: ;
  }

  .completed {
    color: #2b8a3e;
  }

  .in-progress {
    color: #d97706;
  }

  .pending {
    color: #dc2626;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export default ProductTable;

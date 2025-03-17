import {
  faAngleLeft,
  faCartPlus,
  faCreditCard,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styled from "styled-components";
import { fetchGoodDetails } from "../api/goodDetailsAPI";
import CartConfirmModal from "../components/CartConfirmModal";
import { getAccessToken } from "../utils/decodeToken";

const GoodsDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [goods, setGoods] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const getGoodsDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchGoodDetails(id);
        setGoods(data);
      } catch (error) {
        console.error("굿즈 데이터를 가져오는 중 오류 발생:", error);
      }
      setLoading(false);
    };

    getGoodsDetails();
  }, [id]);

  useEffect(() => {
    setUser(getAccessToken() ? true : false);
  }, []);

  function handleAddCart() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleIncrease = () => {
    if (goods && quantity < goods.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    setQuantity(e.target.value); // 입력값 그대로 반영 (유효성 검사는 나중에!)
  };

  const handleInputBlur = () => {
    let value = parseInt(quantity, 10);

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > goods.stock) {
      value = goods.stock;
    }

    setQuantity(value);
  };

  if (loading) return <p>로딩 중...</p>;
  if (!goods) return <p>상품 정보를 불러올 수 없습니다.</p>;

  return (
    <Container>
      {showModal && (
        <CartConfirmModal user={user} handleCloseModal={handleCloseModal} />
      )}

      <ListLink to={"/goods"}>
        <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        <span>목록으로</span>
      </ListLink>

      <Product>
        <img src={goods.imageUrl} alt={goods.name} />
        <Info>
          <ProductInfo>
            <Title>{goods.name}</Title>
            <Category>{goods.category || "카테고리 없음"}</Category>
            <Description>{goods.description}</Description>
            <PriceStockWrapper>
              <Price>가격 : {goods.price}원</Price>
              <Stock>재고 : {goods.stock}개</Stock>
            </PriceStockWrapper>
          </ProductInfo>

          <Line />

          <PriceInfo>
            <QuantityContainer>
              <QuantityButton onClick={handleDecrease}>
                <FontAwesomeIcon icon={faMinus} />
              </QuantityButton>
              <QuantityInput
                type="number"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <QuantityButton onClick={handleIncrease}>
                <FontAwesomeIcon icon={faPlus} />
              </QuantityButton>
            </QuantityContainer>

            <TotalPrice>
              <p>총 상품 금액</p>
              <p>{goods.price * quantity}원</p>
            </TotalPrice>

            <Line />

            <Buttons>
              <button>
                <FontAwesomeIcon icon={faCreditCard} size="2x" />
                <p>구매하기</p>
              </button>
              <button onClick={handleAddCart}>
                <FontAwesomeIcon icon={faCartPlus} size="2x" />
                <p>장바구니</p>
              </button>
            </Buttons>
          </PriceInfo>
        </Info>
      </Product>
    </Container>
  );
};

export default GoodsDetail;

const Container = styled.div`
  width: 1280px;
  margin-top: 20px;
`;

const ListLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;

  & span {
    font-size: 20px;
    padding-top: 3px;
  }

  &:visited {
    color: black;
  }
`;

const Product = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 50px;

  & img {
    width: 500px;
    height: 500px;
    display: block;
    border-radius: 10px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin-top: 30px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px solid #000;
  opacity: 0.2;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 55%;
  border: 1px solid #cccccc;
  padding: 25px;
  text-align: right;
`;

const Title = styled.h4`
  font-size: 50px;
  font-weight: bold;
`;

const Category = styled.p`
  opacity: 0.5;
`;

const Description = styled.p`
  height: 120px;
  overflow: auto;
  padding-right: 10px;
  line-height: 1.4;
  font-size: 16px;
`;

const PriceStockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Stock = styled.p`
  opacity: 0.5;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;

  p:first-child {
    font-size: 15px;
  }

  p:last-child {
    color: #c2292e;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  padding: 5px 10px;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;

  /* 스핀 버튼 제거 */
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* 기본 브라우저 스타일 제거 */

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari */
    margin: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  margin-top: 20px;
  gap: 10px;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    border: 1px solid #cccccc;
    border-radius: 3px;
    background: transparent;
    cursor: pointer;
    gap: 15px;
  }

  button:hover {
    background: #cccccc;
  }

  button:active {
    background: #000;
    border-color: #000;
    color: #fff;
  }

  p {
    font-size: 15px;
  }
`;

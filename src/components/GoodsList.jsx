import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import GoodsItem from './GoodsItem';

const TouristAttractionList = () => {
  const [goods, setGoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPerPage, setGoodsPerPage] = useState(12);

  const fetchGoods = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('./goods.json');
      const result = response.data;
      setGoods(result);
    } catch (error) {
      setError(`Error / ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoods();
  }, []);

  const firstGoodsIndex = (currentPage - 1) * goodsPerPage;
  const lastGoodsIndex = firstGoodsIndex + goodsPerPage;
  const currentGoods = goods.slice(firstGoodsIndex, lastGoodsIndex);
  const pageCount = Math.ceil(goods.length / goodsPerPage);

  const handleChangePage = (selectedButton) => {
    if (selectedButton === 'prev' && currentPage !== 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    } else if (selectedButton === 'next' && currentPage !== pageCount) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  let content = (
    <CardContainer>
      <CardList>
        {currentGoods.map((goods) => (
          <GoodsItem key={goods.id} goods={goods} />
        ))}
      </CardList>
      <Pagination currentPage={currentPage} handleChangePage={handleChangePage} />
    </CardContainer>
  );

  if (isLoading) {
    content = <LoadingText>로딩 중...</LoadingText>;
  } else if (error) {
    content = <ErrorText>{error}</ErrorText>;
  }

  return (
    <section>
      <SubTitleContainer>
        <h2>전통 굿즈</h2>
        <p>전통을 담은 특별한 굿즈를 만나보세요</p>
      </SubTitleContainer>
      {content}
    </section>
  );
};

export default TouristAttractionList;

const SubTitleContainer = styled.div`
  text-align: center;
  padding: 50px;

  & h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const CardContainer = styled.div`
  width: 1280px;
  min-height: 1110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardList = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const LoadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorText = styled(LoadingText)``;

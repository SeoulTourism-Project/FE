import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addGoods } from '../features/goodsSlice';
import GoodsList from '../components/GoodsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Goods = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [category, setCategory] = useState('전체');
  const [showCategory, setShowCategory] = useState(false);

  const dispatch = useDispatch();
  const categoryRef = useRef(null);
  const optionListRef = useRef(null);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredProducts.length / perPage);

  async function fetchGoods() {
    setIsLoading(true);

    try {
      const response = await axios.get('goods.json');
      const result = response.data;
      setAllProducts(result);
      // setFilteredProducts(result);
      dispatch(addGoods(result));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggleCategory() {
    setShowCategory((prevShowCategory) => !prevShowCategory);
  }

  function handleSelectedOption(e) {
    if (e.target.tagName === 'LI') {
      setShowCategory(false);
      setCategory(e.target.textContent);
    }
  }

  useEffect(() => {
    fetchGoods();
  }, []);

  useEffect(() => {
    if (category === '전체') {
      setFilteredProducts(allProducts);
    } else {
      const newProducts = allProducts.filter((item) => item.category === category);
      setFilteredProducts(newProducts);
    }

    setCurrentPage(1);
  }, [category, allProducts]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target) && e.target !== optionListRef.current) {
        setShowCategory(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChangePage = (selectedButton) => {
    if (selectedButton === 'prev' && currentPage !== 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    } else if (selectedButton === 'next' && currentPage !== pageCount) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container>
        <Category>
          <span>카테고리 : </span>
          <CurrentOption onClick={handleToggleCategory} ref={categoryRef}>
            <span>{category}</span>
            {showCategory ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
          </CurrentOption>
          {showCategory && (
            <OptionList onClick={handleSelectedOption} ref={optionListRef}>
              <Option>전체</Option>
              <Option>패션생활용품</Option>
              <Option>공예품</Option>
              <Option>인테리어 소품</Option>
            </OptionList>
          )}
        </Category>
        <GoodsList currentProducts={currentProducts} />
      </Container>
      <Pagination currentPage={currentPage} handleChangePage={handleChangePage} />
    </>
  );
};

export default Goods;

const Container = styled.div`
  min-height: 1050px;
`;

const Category = styled.div`
  margin: 20px 0 20px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  & > span {
    font-size: 20px;
    font-weight: bold;
  }
`;

const CurrentOption = styled.button`
  width: 130px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const OptionList = styled.ul`
  width: 150px;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  z-index: 1;
  position: absolute;
  top: 35px;
  left: 90px;
`;

const Option = styled.li`
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

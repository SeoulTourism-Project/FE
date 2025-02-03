import styled from 'styled-components';
import TouristAttractionItem from './TouristAttractionItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const TouristAttractionList = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [touristAttractionsPerPage, setTouristAttractionsPerPage] = useState(12);

  const fetchTouristAttraction = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('./location.json');
      const result = response.data;
      setTouristAttractions(result);
    } catch (error) {
      setError(`Error / ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTouristAttraction();
  }, []);

  const firstTouristAttractionIndex = (currentPage - 1) * touristAttractionsPerPage;
  const lastTouristAttractionIndex = firstTouristAttractionIndex + touristAttractionsPerPage;
  const currentTouristAttractions = touristAttractions.slice(firstTouristAttractionIndex, lastTouristAttractionIndex);
  const pageCount = Math.ceil(touristAttractions.length / touristAttractionsPerPage);

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
        {currentTouristAttractions.map((touristAttraction) => (
          <TouristAttractionItem key={touristAttraction.id} touristAttraction={touristAttraction} />
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
        <h2>관광지</h2>
        <p>매력적인 장소를 지금 만나보세요</p>
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
  min-height: 839px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LoadingText = styled.div`
  min-height: 760px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled(LoadingText)``;

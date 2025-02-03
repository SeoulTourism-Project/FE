import styled from "styled-components";
import TouristAttractionItem from "./TouristAttractionItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const TouristAttractionList = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [touristAttractionsPerPage, setTouristAttractionsPerPage] =
    useState(12);

  const fetchTouristAttraction = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("./location.json");
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

  const firstTouristAttractionIndex =
    (currentPage - 1) * touristAttractionsPerPage;
  const lastTouristAttractionIndex =
    firstTouristAttractionIndex + touristAttractionsPerPage;
  const currentTouristAttractions = touristAttractions.slice(
    firstTouristAttractionIndex,
    lastTouristAttractionIndex
  );
  const pageCount = Math.ceil(
    touristAttractions.length / touristAttractionsPerPage
  );

  const handleChangePage = (selectedButton) => {
    if (selectedButton === "prev" && currentPage !== 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    } else if (selectedButton === "next" && currentPage !== pageCount) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  let content = (
    <CardContainer>
      <CardList>
        {currentTouristAttractions.map((touristAttraction) => (
          <TouristAttractionItem
            key={touristAttraction.id}
            touristAttraction={touristAttraction}
          />
        ))}
      </CardList>
      <Pagination
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </CardContainer>
  );

  if (isLoading) {
    content = <LoadingText>로딩 중...</LoadingText>;
  } else if (error) {
    content = <ErrorText>{error}</ErrorText>;
  }

  return <section>{content}</section>;
};

export default TouristAttractionList;

const CardContainer = styled.div`
  width: 1280px;
  min-height: 970px;
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

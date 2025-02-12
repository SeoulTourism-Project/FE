import styled from "styled-components";
import TouristAttractionItem from "./TouristAttractionItem";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { fetchTouristAttractions } from "../api/touristAttractionsAPI";

const TouristAttractionList = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const touristAttractionsPerPage = 12;

  useEffect(() => {
    const loadTouristAttractions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTouristAttractions(
          currentPage,
          touristAttractionsPerPage
        );
        setTouristAttractions(data.maps);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTouristAttractions();
  }, [currentPage]);

  const handleChangePage = (selectedButton) => {
    if (selectedButton === "prev" && currentPage > 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    } else if (selectedButton === "next" && currentPage < totalPages) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  let content = (
    <CardContainer>
      <CardList>
        {touristAttractions.length > 0 ? (
          touristAttractions.map((touristAttraction) => (
            <TouristAttractionItem
              key={touristAttraction.id}
              touristAttraction={touristAttraction}
            />
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Pagination = ({ currentPage, handleChangePage }) => {
  return (
    <ButtonContainer>
      <button onClick={() => handleChangePage("prev")}>
        <FontAwesomeIcon icon={faAngleLeft} size="2x" />
      </button>
      <p>{currentPage + 1}</p>
      <button onClick={() => handleChangePage("next")}>
        <FontAwesomeIcon icon={faAngleRight} size="2x" />
      </button>
    </ButtonContainer>
  );
};

export default Pagination;

const ButtonContainer = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;

  & button {
    border: none;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
  }
`;

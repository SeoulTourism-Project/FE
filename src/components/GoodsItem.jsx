import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GoodsItem = ({ goods }) => {
  const navigate = useNavigate();

  const handleMoveDetail = () => {
    navigate(`/goods/${goods.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <Card>
      <ButtonContainer>
        <button onClick={handleMoveDetail}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#fff' }} size='3x' />
        </button>
        <button>
          <FontAwesomeIcon icon={faCartShopping} style={{ color: '#fff' }} size='3x' />
        </button>
      </ButtonContainer>

      <img src='https://placehold.co/400' alt='...' />
      <h4>{goods.title}</h4>
      <p>가격 : {goods.price}</p>
    </Card>
  );
};

export default GoodsItem;

const Card = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc(25% - 10px);
  position: relative;
  padding: 10px;
  transition: all 0.3s;

  & img {
    display: block;
    width: 100%;
    height: 240px;
    border-radius: 8px;
    object-fit: cover;
  }

  & h4 {
    font-size: 1.25rem;
    font-weight: bold;
    width: 290px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover div {
    visibility: visible;
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000080;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;

  & button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;

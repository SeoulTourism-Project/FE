import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router";

const TouristAttractionItem = ({
  touristAttraction,
  width = "calc(25% - 20px)",
}) => {
  const navigate = useNavigate();
  const location = touristAttraction.address.slice(6, 9);

  const handleMoveDetail = () => {
    navigate(`/tourist-attraction/${touristAttraction.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <Card
      width={width}
      onClick={() => navigate(`/tourist-attraction/${touristAttraction.id}`)}
    >
      <CardBadge>{touristAttraction.name}</CardBadge>
      <CardImage src={touristAttraction.image} alt="..." />
      <CardLocation>
        <FontAwesomeIcon icon={faLocationDot} size="lg" />
        <span>{location}</span>
      </CardLocation>
    </Card>
  );
};

export default TouristAttractionItem;

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  max-height: 300px;
  position: relative;
  cursor: pointer;
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

const CardLocation = styled.div`
  & span {
    margin-left: 10px;
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

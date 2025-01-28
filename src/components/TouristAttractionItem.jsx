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
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardBadge = styled.span`
  max-width: 278px;
  position: absolute;
  top: 10px;
  left: 10px;
  background: #00000050;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const CardLocation = styled.div`
  margin: 10px 0 30px;

  & span {
    margin-left: 10px;
  }
`;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const TouristAttractionItem = ({ touristAttraction, width = '312px' }) => {
  const location = touristAttraction.address.slice(6, 9);

  const navigate = useNavigate();

  return (
    <Card
      width={width}
      onClick={() => {
        navigate(`/tourist-attraction/${touristAttraction.id}`, {
          state: {
            id: touristAttraction.id,
            name: touristAttraction.name,
            image: touristAttraction.image,
            address: touristAttraction.address,
          },
        });
      }}
    >
      <CardBadge>{touristAttraction.name}</CardBadge>
      <img src={touristAttraction.image} alt={touristAttraction.name} />
      <CardLocation>
        <FontAwesomeIcon icon={faLocationDot} size='lg' />
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
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const CardBadge = styled.span`
  position: absolute;
  max-width: 271px;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

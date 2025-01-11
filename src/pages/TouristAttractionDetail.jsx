import { faAngleLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const TouristAttractionDetail = () => {
  const navigate = useNavigate();

  return (
    <>
      <ListView>
        <BackButton onClick={() => navigate('/tourist-attraction')}>
          <FontAwesomeIcon icon={faAngleLeft} size='2x' />
          <span>목록으로</span>
        </BackButton>
      </ListView>
      <LocationContainer>
        <LocationInfoArea>
          <LocationImage>
            <img src='/images/gyeongbokgung.jpg' alt='' />
          </LocationImage>
          <LocationInfo>
            <h3>경복궁</h3>
            <p>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>서울특별시 종로구 사직로 161</span>
            </p>
            <p>조선 시대의 대표 궁궐로, 한국 전통 건축물의 아름다움을 감상할 수 있는 곳입니다.</p>
          </LocationInfo>
        </LocationInfoArea>
        <LocationMapArea>
          <img src='https://placehold.co/1300x700' alt='' />
        </LocationMapArea>
      </LocationContainer>
    </>
  );
};

export default TouristAttractionDetail;

const ListView = styled.div`
  width: 1280px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 50px 0;
  border: none;
  background: transparent;
  cursor: pointer;

  & span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const LocationContainer = styled.section`
  width: 1280px;
`;

const LocationInfoArea = styled.div`
  display: flex;
`;

const LocationImage = styled.div`
  min-width: 600px;

  & img {
    display: block;
    width: 100%;
    height: 400px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0 20px 30px;

  & h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  & span {
    margin-left: 10px;
  }

  & p:last-child {
    max-height: 278px;
    overflow-y: auto;
    padding: 1px 0;
  }
`;

const LocationMapArea = styled.div`
  padding: 50px 0;

  & img {
    display: block;
    border-radius: 8px;
  }
`;

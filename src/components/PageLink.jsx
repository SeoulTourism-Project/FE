import { Link } from 'react-router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

const PageLink = () => {
  return (
    <LinkArea>
      <LinkList>
        <li>
          <StyledLink to={'/tourist-attraction'}>
            <FontAwesomeIcon icon={faMapLocationDot} size='6x' />
            <div>
              <h3>관광지</h3>
              <p>매력적인 장소를 지금 만나보세요</p>
            </div>
          </StyledLink>
        </li>
        <li>
          <StyledLink to={'/statistics'}>
            <FontAwesomeIcon icon={faChartSimple} size='6x' />
            <div>
              <h3>통계</h3>
              <p>발자취를 데이터로 한눈에 파악하세요</p>
            </div>
          </StyledLink>
        </li>
        <li>
          <StyledLink to={'/goods'}>
            <FontAwesomeIcon icon={faYinYang} size='6x' />
            <div>
              <h3>전통 굿즈</h3>
              <p>전통을 담은 특별한 굿즈를 만나보세요</p>
            </div>
          </StyledLink>
        </li>
      </LinkList>
    </LinkArea>
  );
};

export default PageLink;

const LinkArea = styled.section`
  width: 1280px;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkList = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-decoration: none;
  color: black;
  transition: all 0.3s;

  & h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:visited {
    color: black;
  }
`;

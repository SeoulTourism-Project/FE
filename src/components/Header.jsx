import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router';
import styled from 'styled-components';
import Navbar from './Navbar';

const Header = () => {
  const { pathname } = useLocation();

  let navbar = <Navbar />;

  if (pathname === '/login' || pathname === '/signup') {
    navbar = undefined;
  }
  return (
    <>
      <HeaderArea>
        <TItle>
          <Link to={'/'}>안녕 서울!</Link>
        </TItle>
        <LanguageArea>
          <FontAwesomeIcon icon={faGlobe} size='2x' />
          <select>
            <option>번역 기능</option>
          </select>
        </LanguageArea>
        {navbar}
      </HeaderArea>
    </>
  );
};

export default Header;

const HeaderArea = styled.header`
  padding: 50px 60px;
  position: fixed;
  width: 100%;
  top: 0;
  background: white;
  display: flex;
  align-items: center;
  gap: 30px;
  z-index: 1;
`;

const TItle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  flex-grow: 1;

  & a {
    color: black;
    text-decoration: none;

    &:visited {
      color: black;
    }
  }
`;

const LanguageArea = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

import { Link } from 'react-router';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <nav>
      <StyledLink to={'/login'}>로그인</StyledLink>
      <StyledLink to={'/signup'}>회원가입</StyledLink>
    </nav>
  );
};

export default Navbar;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  text-decoration: none;

  &:last-child {
    margin-left: 20px;
  }
`;

import Header from './Header';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  margin-top: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

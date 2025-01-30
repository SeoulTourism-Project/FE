import styled from 'styled-components';

export const Modal = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  & button {
    border: none;
    background: transparent;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;

const Main = styled.div`
  min-width: 500px;
  background: white;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 30px 50px;
`;

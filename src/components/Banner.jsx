import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerArea>
      <BannerText>
        <h2>서울에서 만나는 특별한 하루</h2>
        <p>언제 방문하든 완벽한 여행을 위해 준비된 정보를 확인하세요</p>
      </BannerText>
      <BannerImage>
        <img src='https://placehold.co/600x400' alt='...' width='100%' draggable='false' />
      </BannerImage>
    </BannerArea>
  );
};

export default Banner;

const BannerArea = styled.section`
  width: 1280px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const BannerText = styled.div`
  width: 70%;

  & h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;
const BannerImage = styled.div`
  width: 100%;

  & img {
    display: block;
    border-radius: 20px;
  }
`;

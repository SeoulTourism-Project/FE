import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserNameFromToken } from "../utils/decodeToken";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const storedUsername = getUserNameFromToken();
    console.log(storedUsername);
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "사용자");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <NavContainer>
      {!isLoggedIn ? (
        // 로그인하지 않은 경우 (로그인 & 회원가입 버튼)
        <>
          <StyledLink to="/login">로그인</StyledLink>
          <StyledLink to="/signup">회원가입</StyledLink>
        </>
      ) : (
        // 로그인한 경우 (마이페이지, 찜한 여행지, 캘린더, 로그아웃 등)
        <WelcomeText>환영합니다 {username}님</WelcomeText>
      )}
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
`;

const WelcomeText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

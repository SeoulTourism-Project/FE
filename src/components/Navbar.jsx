import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserNameFromToken } from "../utils/decodeToken";
import { logoutAPI } from "../api/logoutAPI";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isClickedMenu, setIsClickedMenu] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const storedUsername = getUserNameFromToken();
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "사용자");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsClickedMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("현재 쿠키:", document.cookie);

    try {
      await logoutAPI();
      alert("로그아웃 되었습니다.");
      window.location.reload(); // 새로고침으로 상태 초기화
    } catch (error) {
      alert("로그아웃 실패: " + error.message);
    }
  };

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
        <MenuContainer>
          <WelcomeText>
            환영합니다
            <p>{username}</p>님!
          </WelcomeText>
          <DropdownMenu>
            <MenuButton onClick={handleMenuToggle}>
              <FontAwesomeIcon icon={faBars} size="2xl" />
            </MenuButton>
            {isClickedMenu ? (
              <DropdownList onClick={handleMenuToggle}>
                <DropdownItem to="/">홈페이지</DropdownItem>
                <DropdownItem to="/cart">카트</DropdownItem>
                <DropdownItem to="/mytravel">나의 여행</DropdownItem>
                <DropdownItem to="/mypage">마이페이지</DropdownItem>
                <DropdownItem as="button" onClick={handleLogout}>
                  로그아웃
                </DropdownItem>
              </DropdownList>
            ) : null}
          </DropdownMenu>
        </MenuContainer>
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

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const WelcomeText = styled.div`
  display: flex;
  font-size: 1.2rem;
  gap: 0.3rem;

  p {
    font-weight: bold;
  }
`;

const MenuButton = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 150px;
  margin-top: 20px;
  padding: 10px 0;
`;

const DropdownItem = styled(Link)`
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  color: black;
  text-decoration: none;
  border: none;
  background: #fff;
  &:hover {
    background: #ddd;
  }
`;

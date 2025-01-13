import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router";
import styled from "styled-components";
import Navbar from "./Navbar";
import { useEffect } from "react";

const Header = () => {
  const { pathname } = useLocation();

  let navbar = <Navbar />;

  if (pathname === "/login" || pathname === "/signup") {
    navbar = undefined;
  }

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "ko",
        autoDisplay: false,
        includedLanguages: "en,ko,ja,zh-CN,zh-TW",
      },
      "google_translate_element"
    );

    // 번역된 언어 추적
    const observer = new MutationObserver(() => {
      const langAttr = document.querySelector("html").getAttribute("lang");
      if (langAttr) {
        console.log(`현재 번역된 언어: ${langAttr}`);
      }
    });

    // HTML lang 속성을 감시
    observer.observe(document.querySelector("html"), {
      attributes: true,
      attributeFilter: ["lang"],
    });
  };

  useEffect(() => {
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  return (
    <>
      <HeaderArea>
        <TItle>
          <Link to={"/"}>안녕 서울!</Link>
        </TItle>
        <LanguageArea>
          <FontAwesomeIcon icon={faGlobe} size="2x" />
          <div id="google_translate_element"></div>
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

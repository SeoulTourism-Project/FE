import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const CustomDropdown = ({
  options = [],
  selected,
  setSelected,
  placeholder = "선택하세요",
  width,
  buttonColor,
  textColor,
  hoverColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} width={width}>
      <DropdownButton
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 차단
          setIsOpen((prev) => !prev); // 토글 방식으로 열기/닫기
        }}
        buttonColor={buttonColor}
        textColor={textColor}
        hoverColor={hoverColor}
      >
        {selected || placeholder}
      </DropdownButton>
      {isOpen && (
        <DropdownList hoverColor={hoverColor}>
          {options.map((option) => (
            <li
              key={option}
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 전파 차단
                setSelected(option);
                setIsOpen(false); // 선택 후 드롭다운 닫기
              }}
            >
              {option}
            </li>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${(props) => props.width || "200px"};
`;

const DropdownButton = styled.button`
  background-color: ${(props) => props.buttonColor || "white"};
  color: ${(props) => props.textColor || "black"};
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#eee"};
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;

  li {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.hoverColor || "black"};
      color: white;
    }
  }
`;

export default CustomDropdown;

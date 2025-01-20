import React from "react";
import styled from "styled-components";

const ScheduleAddModal = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    // 모달 외부 클릭 시 onClose 호출
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative; // 모달 위치 조정 시 필요
`;

export default ScheduleAddModal;

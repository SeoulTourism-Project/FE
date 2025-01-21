import React, { useState } from "react";
import styled from "styled-components";
import StepPlaceSelection from "./StepPlaceSelection";
import StepScheduleSetup from "./StepScheduleSetup";

const ScheduleAddModal = ({ onClose, selectedDate }) => {
  const [step, setStep] = useState(1); // 단계 관리
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택한 여행지

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleSave = (scheduleData) => {
    console.log("Schedule saved:", scheduleData);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepPlaceSelection
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <StepScheduleSetup
            selectedPlace={selectedPlace}
            selectedDate={selectedDate}
            onPrevious={handlePreviousStep}
            onSave={handleSave}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>{renderStep()}</ModalContent>
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
`;

export default ScheduleAddModal;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StepPlaceSelection from "./StepPlaceSelection";
import StepScheduleSetup from "./StepScheduleSetup";
import { fetchFavoriteList } from "../../../../api/favoriteListAPI";

const ScheduleAddModal = ({ onClose, selectedDate, onAddSchedule }) => {
  const [step, setStep] = useState(1); // 단계 관리
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택한 여행지
  const [favoriteList, setFavoriteList] = useState([]); // 서버에서 받아온 장소 데이터
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavoriteList = async () => {
      try {
        const data = await fetchFavoriteList();
        setFavoriteList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFavoriteList();
  }, []);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    switch (step) {
      case 1:
        return (
          <StepPlaceSelection
            locations={favoriteList}
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
            onAddSchedule={onAddSchedule}
            onClose={onClose}
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
  padding: 50px 20px 20px 20px;
  border-radius: 8px;
  width: 600px;
  min-height: 600px;
  height: 80%;
  text-align: center;
`;

export default ScheduleAddModal;

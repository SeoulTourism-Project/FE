import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StepPlaceSelection from "./StepPlaceSelection";
import StepScheduleSetup from "./StepScheduleSetup";
import axios from "axios";

const ScheduleAddModal = ({ onClose, selectedDate, onSaveSuccess }) => {
  const [step, setStep] = useState(1); // 단계 관리
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택한 여행지
  const [locations, setLocations] = useState([]); // 서버에서 받아온 장소 데이터
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/location.json");
        const data = response.data;

        const likedLocations = data.filter(
          (location) => location.likeStatus === true
        );
        setLocations(likedLocations);
      } catch (err) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleSave = async (scheduleData) => {
    try {
      // 서버 요청 대신 테스트용 Promise 사용
      const mockPostRequest = (data) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // 성공 확률 90%, 실패 확률 10%
            Math.random() > 0.1
              ? resolve({ status: 200, data })
              : reject(new Error("테스트 실패"));
          }, 1000); // 1초 지연
        });

      const response = await mockPostRequest(scheduleData);

      if (response.status === 200) {
        console.log("테스트: Schedule saved:", scheduleData);

        // 부모 컴포넌트에 저장된 데이터 전달
        if (onSaveSuccess) {
          onSaveSuccess(scheduleData);
        }
        alert("일정이 추가되었습니다.");
        onClose();
      }
    } catch (err) {
      console.error("테스트: Failed to save schedule:", err);
      alert(
        "테스트: 일정을 저장하는 중 문제가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  const renderStep = () => {
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    switch (step) {
      case 1:
        return (
          <StepPlaceSelection
            locations={locations} // 장소 데이터를 자식에 전달
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
  padding: 50px 20px 20px 20px;
  border-radius: 8px;
  width: 600px;
  min-height: 600px;
  height: 80%;
  text-align: center;
`;

export default ScheduleAddModal;

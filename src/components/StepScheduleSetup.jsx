import React, { useState } from "react";
import styled from "styled-components";

const StepScheduleSetup = ({
  selectedPlace,
  selectedDate,
  onPrevious,
  onSave,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [memo, setMemo] = useState("");

  const handleSave = () => {
    const scheduleData = {
      date: selectedDate,
      place: selectedPlace,
      startTime,
      endTime,
      memo,
    };
    onSave(scheduleData);
  };

  return (
    <>
      <h2>일정 설정</h2>
      <SelectedPlace>{selectedPlace}</SelectedPlace>
      <SelectedDate>{selectedDate.toDateString()}</SelectedDate>
      <InputContainer>
        <label>
          시작 시간:
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">선택</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            {/* 추가 시간 옵션 */}
          </select>
        </label>
        <label>
          종료 시간:
          <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
            <option value="">선택</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            {/* 추가 시간 옵션 */}
          </select>
        </label>
      </InputContainer>
      <MemoInput
        placeholder="메모 입력"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <ButtonContainer>
        <PreviousButton onClick={onPrevious}>이전</PreviousButton>
        <SaveButton
          onClick={handleSave}
          disabled={!startTime || !endTime || !memo}
        >
          저장
        </SaveButton>
      </ButtonContainer>
    </>
  );
};

const SelectedPlace = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const SelectedDate = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  color: gray;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const MemoInput = styled.textarea`
  width: 100%;
  height: 60px;
  resize: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PreviousButton = styled.button`
  background: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const SaveButton = styled(PreviousButton)`
  background: #007bff;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default StepScheduleSetup;

import React, { useState } from "react";
import styled from "styled-components";
import ScheduleCard from "./ScheduleCard";

const generateTimeOptions24 = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, "0"); // 2자리로 포맷팅 (예: 01, 02, ...)
    times.push(`${formattedHour}:00`);
  }
  return times;
};

const StepScheduleSetup = ({
  selectedPlace,
  selectedDate,
  onPrevious,
  onSave,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [memo, setMemo] = useState("");

  const timeOptions = generateTimeOptions24(); // 시간 리스트 생성

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

  const handleMemoChange = (e) => {
    const input = e.target.value;
    if (input.length <= 40) {
      setMemo(input); // 40자 이하일 때만 상태 업데이트
    }
  };

  return (
    <>
      <h2>일정 설정</h2>
      <SelectedPlace>
        <ScheduleCard schedule={selectedPlace} />
      </SelectedPlace>
      <SelectedDate>{selectedDate.toDateString()}</SelectedDate>
      <InputContainer>
        <label>
          시작 시간:
          <Select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="">시간 선택</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </label>
        <label>
          종료 시간:
          <Select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
            <option value="">시간 선택</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </label>
      </InputContainer>
      <MemoInput
        placeholder="메모 입력 (최대 40자)"
        value={memo}
        onChange={handleMemoChange}
      />
      <CharCount>{memo.length}/40</CharCount>

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
  margin-right: 20px;
  text-align: left;
  display: flex;
  align-items: center;
`;

const SelectedDate = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 120px;
  padding: 5px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const MemoInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  margin-bottom: 5px;
`;

const CharCount = styled.div`
  font-size: 0.9rem;
  color: gray;
  text-align: right;
  margin-bottom: 15px;
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

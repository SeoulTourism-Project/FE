import React, { useState } from "react";
import styled from "styled-components";
import ScheduleCard from "./ScheduleCard";

// select data
const generateTimeOptions24 = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
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

  const timeOptions = generateTimeOptions24();

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
      setMemo(input);
    }
  };

  return (
    <>
      <Title>일정 설정</Title>
      <ScrollableContent>
        <Section>
          <h3>여행지</h3>
          <ScheduleCard schedule={selectedPlace} />
        </Section>
        <Section>
          <h3>날짜</h3>
          <DateDisplay>{selectedDate.toDateString()}</DateDisplay>
        </Section>
        <Section>
          <h3>시간</h3>
          <InputRow>
            <TimeColumn>
              <TimeLabel>시작 시간</TimeLabel>
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
            </TimeColumn>
            <Dash>-</Dash>
            <TimeColumn>
              <TimeLabel>종료 시간</TimeLabel>
              <Select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                <option value="">시간 선택</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </TimeColumn>
          </InputRow>
        </Section>
        <Section>
          <h3>메모</h3>
          <MemoInput
            placeholder="메모 입력 (최대 40자)"
            value={memo}
            onChange={handleMemoChange}
          />
          <CharCount>{memo.length}/40</CharCount>
        </Section>
      </ScrollableContent>
      <ButtonContainer>
        <PreviousButton onClick={onPrevious}>이전</PreviousButton>
        <SaveButton onClick={handleSave} disabled={!startTime || !endTime}>
          저장
        </SaveButton>
      </ButtonContainer>
    </>
  );
};

const Title = styled.h2`
  text-align: center;
`;

const ScrollableContent = styled.div`
  max-height: 75%; /* 스크롤 활성화 */
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const Section = styled.div`
  margin-bottom: 50px;

  h3 {
    font-size: 20px;
    background: #eee;
    border-radius: 5px;
    padding: 5px 0;
    margin-bottom: 15px;
  }
`;

const DateDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeLabel = styled.span`
  margin-bottom: 8px;
  font-size: 1rem;
  color: #999;
`;

const Dash = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 0.75rem;
`;

const Select = styled.select`
  width: 120px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;

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
`;

const CharCount = styled.div`
  font-size: 0.9rem;
  color: gray;
  text-align: right;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 10px;
`;

const PreviousButton = styled.button`
  background: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(PreviousButton)`
  background: black;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default StepScheduleSetup;

import React from "react";
import styled from "styled-components";
import {
  formatDate,
  formatTime24,
  convertToKoreaDate,
} from "../utils/koreaDateUtils"; // 한국 시간대로 변경
import ScheduleCard from "./ScheduleCard";

const Timetable = ({ date, schedules }) => {
  // 선택된 날짜와 일치하는 일정 필터링
  const filteredSchedules = schedules.filter(
    (schedule) => schedule.date === formatDate(date) // 날짜 비교 시 formatDate 활용
  );

  return (
    <TimeTableContainer>
      <h2>{convertToKoreaDate(date).toDateString()}</h2>
      {filteredSchedules.length > 0
        ? filteredSchedules.map((schedule, index) => (
            <ScheduleContainer key={index}>
              <Figure>
                <Circle value={"black"} />
                <Line />
              </Figure>
              <ScheduleCard schedule={schedule} /> {/* ScheduleCard 사용 */}
            </ScheduleContainer>
          ))
        : null}
      <ScheduleAddContainer>
        <Circle value={"#f9f9f9"} id="addCircle" />
        <ScheduleAddButton>+ 추가</ScheduleAddButton>
      </ScheduleAddContainer>
    </TimeTableContainer>
  );
};

const TimeTableContainer = styled.div`
  width: 680px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 0 50px 20px;

  width: 80%;
  height: 180px;
`;

const Figure = styled.div`
  margin-right: 35px;
`;

const Circle = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-radius: 50%;
  background: ${(props) => props.value};
`;

const Line = styled.div`
  display: flex;
  margin-left: 12px;

  border-left: 1px solid black;
  height: 210px;
`;

const ScheduleAddContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const ScheduleAddButton = styled.button`
  width: 80px;
  height: 25px;
  margin-left: 35px; // = figure - margin-right

  background: #f9f9f9;
  border: 1px solid black;
  border-radius: 25px;

  font-size: 1rem;

  &:hover {
    background: black;
    color: #f9f9f9;
  }

  &: ;
`;

export default Timetable;

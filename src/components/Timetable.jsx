import React from "react";
import styled from "styled-components";
import { formatDate, formatTime24 } from "../utils/koreaDateUtils"; // 한국 시간대로 변경

const Timetable = ({ date, schedules }) => {
  // 선택된 날짜와 일치하는 일정 필터링
  const filteredSchedules = schedules.filter(
    (schedule) => schedule.date === formatDate(date) // 날짜 비교 시 formatDate 활용
  );

  return (
    <TimeTableContainer>
      <h2>{formatDate(date)}</h2> {/* YYYY-MM-DD 형식으로 날짜 표시 */}
      {filteredSchedules.length > 0 ? (
        filteredSchedules.map((schedule, index) => (
          <ScheduleContainer key={index}>
            <ScheduleItem>
              <ScheduleImage src={schedule.image} alt={schedule.title} />
              <ScheduleDetails>
                <h3>{schedule.title}</h3>
                <p>{schedule.address}</p>
                <p>{schedule.memo}</p>
                <p>
                  {formatTime24(schedule.scheduleDate)} -{" "}
                  {formatTime24(schedule.scheduleEndDate)}
                </p>
              </ScheduleDetails>
            </ScheduleItem>
          </ScheduleContainer>
        ))
      ) : (
        <EmptySpace>
          <p>일정이 없습니다.</p>
        </EmptySpace>
      )}
    </TimeTableContainer>
  );
};

const TimeTableContainer = styled.div`
  width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ScheduleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ScheduleItem = styled.div`
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
`;

const ScheduleImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 5px;
`;

const ScheduleDetails = styled.div`
  flex: 1;
`;

const EmptySpace = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

export default Timetable;

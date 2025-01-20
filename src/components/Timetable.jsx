import React from "react";
import styled from "styled-components";
import {
  formatDate,
  formatTime24,
  convertToKoreaDate,
} from "../utils/koreaDateUtils"; // 한국 시간대로 변경

const Timetable = ({ date, schedules }) => {
  // 선택된 날짜와 일치하는 일정 필터링
  const filteredSchedules = schedules.filter(
    (schedule) => schedule.date === formatDate(date) // 날짜 비교 시 formatDate 활용
  );

  return (
    <TimeTableContainer>
      <h2>{convertToKoreaDate(date).toDateString()}</h2>{" "}
      {/* YYYY-MM-DD 형식으로 날짜 표시 */}
      {filteredSchedules.length > 0
        ? filteredSchedules.map((schedule, index) => (
            <ScheduleContainer key={index}>
              <Figure>
                <Circle value={"black"} />
                <Line />
              </Figure>
              <ScheduleCard>
                <ScheduleTime>
                  {formatTime24(schedule.scheduleDate)} -{" "}
                  {formatTime24(schedule.scheduleEndDate)}
                </ScheduleTime>
                <ScheduleItem>
                  <ScheduleImage src={schedule.image} alt={schedule.title} />
                  <ScheduleDetails>
                    <ScheduleName>{schedule.title}</ScheduleName>
                    <ScheduleAddress>{schedule.address}</ScheduleAddress>
                    <ScheduleMemo>
                      <p>메모</p>
                      {schedule.memo}{" "}
                      {/* 메모 40자 이내로 작성 (띄어쓰기 포함함) */}
                    </ScheduleMemo>
                  </ScheduleDetails>
                </ScheduleItem>
              </ScheduleCard>
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

const ScheduleCard = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 190px;
  margin-top: 2px;
`;

const ScheduleTime = styled.div`
  flex: 0 0 auto;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto; // 남은 크기
  width: 100%;
  margin-left: 8px;

  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const ScheduleImage = styled.img`
  aspect-ratio: 1 / 1;
  height: 100%;
  margin-right: 18px;
  //   border-radius: 5px;
  object-fit: cover; // conver: 자르기 / contain: 전체 보여주기
`;

const ScheduleDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding-top: 20px;
  margin-right: 20px;
`;

const ScheduleName = styled.p`
  font-size: 1.3rem;
  font-weight: bold;

  margin-bottom: 5px;
`;

const ScheduleAddress = styled.p`
  color: gray;

  margin-bottom: 20px;
`;

const ScheduleMemo = styled.div`
  p {
    font-weight: bold;
    margin-bottom: 3px;
  }
`;

const EmptySpace = styled.div`
  margin: 0 0 30px 10px;

  display: flex;
  align-items: center;
  height: 40px;

  background: pink;
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

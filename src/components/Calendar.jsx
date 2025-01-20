import React from "react";
import styled from "styled-components";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = ({ selectedDate, onDateChange, schedules = [] }) => {
  const tileContent = ({ date }) => {
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9 변환
    const formattedDate = koreaDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식

    const hasSchedule = schedules.includes(formattedDate);

    return hasSchedule ? <div>⭐</div> : <div></div>;
  };

  // 오늘 날짜(한국 시간 기준) 가져오기
  const getKoreaToday = () => {
    const now = new Date();
    return new Date(now.getTime() + 9 * 60 * 60 * 1000);
  };

  const tileClassName = ({ date }) => {
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9 변환
    const koreaToday = getKoreaToday().toISOString().split("T")[0];
    const formattedDate = koreaDate.toISOString().split("T")[0];

    // 오늘 날짜인 경우 커스텀 클래스 적용
    if (formattedDate === koreaToday) {
      return "custom-today";
    }
    return null;
  };

  const handleDateChange = (date) => {
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9 적용

    onDateChange(koreaDate);
  };

  return (
    <CalendarContainer>
      <ReactCalendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  .react-calendar {
    width: 500px;
    height: auto;
  }

  .react-calendar__tile {
    height: 80px !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  /* 기본 "오늘 날짜" 클래스 무시 */
  .react-calendar__tile--now {
    background: none !important;
    color: inherit !important;
  }

  /* 커스텀 "오늘 날짜" 클래스 */
  .custom-today {
    background-color: #ff6f61 !important;
    color: white !important;
    font-weight: bold;
  }

  .react-calendar__tile div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Calendar;

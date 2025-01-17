import React from "react";
import styled from "styled-components";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = ({ selectedDate, onDateChange, schedules = [] }) => {
  const tileContent = ({ date }) => {
    const hasSchedule = schedules.includes(date.toISOString().split("T")[0]); // "YYYY-MM-DD" -> "YYYY-MM-DDTHH:mm:ss.sssZ"

    return hasSchedule ? <div>⭐</div> : <div></div>;
  };

  const handleDateChange = (date) => {
    onDateChange(date);
  };

  return (
    <CalendarContainer>
      <ReactCalendar
        value={selectedDate}
        onChange={handleDateChange}
        tileContent={tileContent}
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

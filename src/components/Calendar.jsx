import React from "react";
import styled from "styled-components";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = () => {
  return (
    <CalendarContainer>
      <ReactCalendar />
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
  }
`;

export default Calendar;

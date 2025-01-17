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

const CalendarContainer = styled.div``;

export default Calendar;

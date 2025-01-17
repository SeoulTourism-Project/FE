import React from "react";
import styled from "styled-components";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = ({ selectedDate, onDateChange, schedules = [] }) => {
  console.log("selectedDate: ", selectedDate);

  const handleDateChange = (date) => {
    onDateChange(date);
  };

  return (
    <CalendarContainer>
      <ReactCalendar value={selectedDate} onChange={handleDateChange} />
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

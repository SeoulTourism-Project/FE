import React, { useState } from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarSchedules = ["2024-12-31", "2025-01-01", "2025-01-12"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        schedules={calendarSchedules}
      />
      <Timetable />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: #f9f9f9; // 임시
  display: flex;
  justify-content: center;
  align-itmes: flex-start;
  gap: 20px;
`;

export default Itinerary;

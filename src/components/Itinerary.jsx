import React, { useState } from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarSchedules = ["2024-12-31", "2025-01-01", "2025-01-12"];

  const timeTableSchedules = [
    {
      date: "2024-12-31",
      title: "서울타워",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 중구 남산공원길 105",
      memo: "남산타워 야경 보기",
      scheduleDate: "2024-12-31T18:00:00",
      scheduleEndDate: "2024-12-31T21:00:00",
    },
    {
      date: "2025-01-01",
      title: "한강공원",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 영등포구 여의동로 330",
      memo: "한강에서 새해맞이",
      scheduleDate: "2024-01-01T06:00:00",
      scheduleEndDate: "2024-01-01T08:00:00",
    },
    {
      date: "2025-01-01",
      title: "어딘가...",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 영등포구 여의동로 330",
      memo: "뭐 넣어야 하지...",
      scheduleDate: "2024-01-01T09:00:00",
      scheduleEndDate: "2024-01-01T12:00:00",
    },
    {
      date: "2025-01-12",
      title: "광화문",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 종로구 세종대로 175",
      memo: "광화문 역사 탐방",
      scheduleDate: "2024-01-12T10:00:00",
      scheduleEndDate: "2024-01-12T12:00:00",
    },
  ];

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
      <Timetable date={selectedDate} schedules={timeTableSchedules} />
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

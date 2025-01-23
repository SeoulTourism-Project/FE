import React, { useState } from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";
import { formatDate, formatKoreaDate } from "../utils/changeDateFormUtils";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 일정 데이터를 상태로 관리
  const [timeTableSchedules, setTimeTableSchedules] = useState([
    {
      id: 1,
      date: "2024-12-31",
      name: "서울타워",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 중구 남산공원길 105",
      memo: "남산타워 야경 보기",
      scheduleDate: "2024-12-31T18:00:00",
      scheduleEndDate: "2024-12-31T21:00:00",
    },
    {
      id: 2,
      date: "2025-01-01",
      name: "한강공원",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 영등포구 여의동로 330",
      memo: "한강에서 새해맞이",
      scheduleDate: "2025-01-01T06:00:00",
      scheduleEndDate: "2025-01-01T08:00:00",
    },
    {
      id: 3,
      date: "2025-01-01",
      name: "어딘가...",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 영등포구 여의동로 330",
      memo: "뭐 넣어야 하지...",
      scheduleDate: "2025-01-01T09:00:00",
      scheduleEndDate: "2025-01-01T12:00:00",
    },
    {
      id: 4,
      date: "2025-01-12",
      name: "광화문",
      image: "/images/dummyImage.jpg",
      address: "서울특별시 종로구 세종대로 175",
      memo: "광화문 역사 탐방",
      scheduleDate: "2025-01-12T10:00:00",
      scheduleEndDate: "2025-01-12T12:00:00",
    },
  ]);

  const calendarSchedules = ["2024-12-31", "2025-01-01", "2025-01-12"];

  // 일정 삭제
  const onDeleteSchedule = (id) => {
    setTimeTableSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule.id !== id)
    );

    alert("일정이 삭제되었습니다.");
  };

  const onAddSchedule = (savedData) => {
    console.log("부모 컴포넌트에서 받은 데이터: ", savedData);
    console.log("startTime: ", savedData.scheduleDate.toISOString());
    console.log("endTime: ", savedData.scheduleEndDate.toISOString());
  };

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
      <Timetable
        date={selectedDate}
        schedules={timeTableSchedules.filter(
          (schedule) => schedule.date === formatKoreaDate(selectedDate)
        )}
        onDeleteSchedule={onDeleteSchedule}
        onAddSchedule={onAddSchedule}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: #f9f9f9; // 임시
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

export default Itinerary;

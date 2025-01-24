import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";
import { combineToUTC, formatKoreaDate } from "../utils/changeDateFormUtils";
import axios from "axios";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 일정 데이터를 상태로 관리
  const [timeTableSchedules, setTimeTableSchedules] = useState([]);

  const calendarSchedules = ["2024-12-31", "2025-01-01", "2025-01-12"];

  // 서버에서 일정 데이터 불러오기
  const fetchScheduleData = async (date) => {
    const formattedDate = formatKoreaDate(date);
    const filePath = `/${formattedDate}.json`; // 공용 파일 경로
    console.log(filePath);

    try {
      const response = await axios.get(filePath);
      if (response.status === 200) {
        setTimeTableSchedules(response.data || []);
      }
    } catch (error) {
      // 파일이 없거나 오류 발생 시 빈 배열 반환
      console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      setTimeTableSchedules([]);
    }
  };

  useEffect(() => {
    fetchScheduleData(selectedDate);
    console.log(timeTableSchedules);
  }, [selectedDate]);

  // 일정 삭제
  const onDeleteSchedule = (id) => {
    setTimeTableSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule.id !== id)
    );

    alert("일정이 삭제되었습니다.");
  };

  const onAddSchedule = async (savedData) => {
    try {
      const formattedDate = formatKoreaDate(savedData.selectedDate);

      const scheduleData = {
        userId: 1,
        mapId: savedData.selectedPlace.id,
        tourStartDate: formattedDate,
        scheduleDate: combineToUTC(formattedDate, savedData.startTime),
        scheduleEndDate: combineToUTC(formattedDate, savedData.endTime),
        memo: savedData.memo,
      };

      // 서버 요청 대신 테스트용 Promise 사용
      const mockPostRequest = (data) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // 성공 확률 90%, 실패 확률 10%
            Math.random() > 0.1
              ? resolve({ status: 200, data })
              : reject(new Error("테스트 실패"));
          }, 1000); // 1초 지연
        });

      const response = await mockPostRequest(scheduleData);

      if (response.status === 200) {
        console.log("테스트: Schedule saved:", scheduleData);

        return Promise.resolve(); // 모달 추가 버튼 handler로 반환환
      }
    } catch (err) {
      return Promise.reject(err);
    }
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

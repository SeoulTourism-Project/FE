import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";
import { combineToUTC, formatKoreaDate } from "../utils/changeDateFormUtils";
import axios from "axios";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarSchedules, setCalendarSchedules] = useState([]);
  const [timeTableSchedules, setTimeTableSchedules] = useState([]);

  const fetchCalendarSchedules = async () => {
    const filePath = `/calendarDate.json`; // 캘린더 일정이 들어 있는 파일 경로

    try {
      const response = await axios.get(filePath);
      if (response.status === 200) {
        setCalendarSchedules(response.data || []); // 데이터를 상태로 저장
        console.log("Calendar schedules:", response.data);
      }
    } catch (error) {
      console.error("캘린더 데이터를 불러오는 중 오류 발생:", error);
      setCalendarSchedules([]); // 오류 발생 시 빈 배열 설정
    }
  };

  // 서버에서 일정 데이터 불러오기
  const fetchTimetableScheduleData = async (date) => {
    const formattedDate = formatKoreaDate(date);
    const filePath = `/${formattedDate}.json`; // 공용 파일 경로
    console.log(filePath);

    try {
      const response = await axios.get(filePath);
      if (response.status === 200) {
        console.log("Response data:", response.data);

        setTimeTableSchedules(
          (response.data || []).map((schedule) => ({
            id: schedule.calendarDetailsId,
            name: schedule.placeName,
            address: schedule.placeAddress,
            scheduleDate: schedule.scheduleDate,
            scheduleEndDate: schedule.scheduleEndDate,
            image: schedule.placeImage,
            memo: schedule.memo,
          }))
        );
      }
    } catch (error) {
      // 파일이 없거나 오류 발생 시 빈 배열 반환
      console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      setTimeTableSchedules([]);
    }
  };

  useEffect(() => {
    fetchCalendarSchedules();
  }, []);

  useEffect(() => {
    fetchTimetableScheduleData(selectedDate);
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

        addScheduleCard(formattedDate, savedData);

        return Promise.resolve(); // 모달 추가 버튼 handler로 반환환
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const addScheduleCard = (formattedDate, data) => {
    const addCardData = {
      id: data.selectedPlace.id,
      name: data.selectedPlace.name,
      address: data.selectedPlace.address,
      scheduleDate: combineToUTC(formattedDate, data.startTime),
      scheduleEndDate: combineToUTC(formattedDate, data.endTime),
      image: data.selectedPlace.image,
      memo: data.memo,
    };

    setTimeTableSchedules([...timeTableSchedules, addCardData]);
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
        schedules={timeTableSchedules}
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

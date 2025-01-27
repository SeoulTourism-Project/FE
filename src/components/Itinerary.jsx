import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";
import {
  combineToUTC,
  formatKoreaDate,
  formatTime24,
} from "../utils/changeDateFormUtils";
import axios from "axios";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarSchedules, setCalendarSchedules] = useState([]);
  const [timeTableSchedules, setTimeTableSchedules] = useState([]);

  console.log("timetableSchedules: ", timeTableSchedules);
  console.log("calendarSchedule: ", calendarSchedules);

  const fetchCalendarSchedules = async () => {
    const filePath = `/calendarDate.json`;

    try {
      const response = await axios.get(filePath);
      if (response.status === 200) {
        setCalendarSchedules(response.data || []);
      }
    } catch (error) {
      console.error("캘린더 데이터를 불러오는 중 오류 발생:", error);
      setCalendarSchedules([]); // 오류 발생 시 빈 배열 설정
    }
  };

  const fetchTimetableScheduleData = async (date) => {
    const formattedDate = formatKoreaDate(date);
    const filePath = `/${formattedDate}.json`;

    try {
      const response = await axios.get(filePath);
      if (response.status === 200) {
        setTimeTableSchedules(
          (response.data || []).map((schedule) => ({
            scheduleId: schedule.calendarDetailsId,
            mapId: schedule.mapId,
            name: schedule.placeName,
            address: schedule.placeAddress,
            startTime: formatTime24(schedule.scheduleDate),
            endTime: formatTime24(schedule.scheduleEndDate),
            image: schedule.placeImage,
            memo: schedule.memo,
          }))
        );
      }
    } catch (error) {
      console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      setTimeTableSchedules([]);
    }
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
            Math.random() > 0.1
              ? resolve({
                  status: 200,
                  data: { ...data, scheduleId: Date.now() },
                })
              : reject(new Error("테스트 실패"));
          }, 1000);
        });

      const response = await mockPostRequest(scheduleData);

      if (response.status === 200) {
        addScheduleCard(response.data, savedData);
        addDateToCalendar(response.data.tourStartDate); // 캘린더에 날짜 추가
        return Promise.resolve();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const onDeleteSchedule = (id) => {
    setTimeTableSchedules((prevSchedules) => {
      const updatedSchedules = prevSchedules.filter(
        (schedule) => schedule.scheduleId !== id
      );

      if (updatedSchedules.length === 0) {
        setCalendarSchedules((prevCalendar) =>
          prevCalendar.filter((date) => date !== formatKoreaDate(selectedDate))
        );
      }

      return updatedSchedules;
    });

    alert("일정이 삭제되었습니다.");
  };

  const addDateToCalendar = (date) => {
    setCalendarSchedules((prev) => {
      if (!prev.includes(date)) {
        return [...prev, date];
      }
      return prev;
    });
  };

  const addScheduleCard = (responseData, localData) => {
    const addCardData = {
      scheduleId: responseData.scheduleId,
      mapId: responseData.mapId,
      name: localData.selectedPlace.name,
      address: localData.selectedPlace.address,
      startTime: formatTime24(responseData.scheduleDate),
      endTime: formatTime24(responseData.scheduleEndDate),
      image: localData.selectedPlace.image,
      memo: responseData.memo,
    };

    console.log("add: ", addCardData.startTime);

    setTimeTableSchedules((prevSchedules) => [...prevSchedules, addCardData]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetchCalendarSchedules();
  }, []);

  useEffect(() => {
    fetchTimetableScheduleData(selectedDate);
  }, [selectedDate]);

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
  background: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

export default Itinerary;

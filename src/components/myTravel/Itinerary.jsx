import React, { useEffect, useState } from "react";
import Calendar from "./itinerary/Calendar";
import Timetable from "./itinerary/Timetable";
import styled from "styled-components";
import { formatKoreaDate } from "../../utils/changeDateFormUtils";
import {
  getMarkedDates,
  getTimetable,
  addSchedule,
  deleteSchedule,
} from "../../api/itineraryAPI";

const Itinerary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarSchedules, setCalendarSchedules] = useState([]);
  const [timeTableSchedules, setTimeTableSchedules] = useState([]);

  const fetchCalendarSchedules = async () => {
    try {
      const data = await getMarkedDates();
      setCalendarSchedules(data || []);
    } catch (error) {
      console.error("캘린더 데이터를 불러오는 중 오류 발생:", error);
      setCalendarSchedules([]);
    }
  };

  const fetchTimetableScheduleData = async (date) => {
    try {
      const formattedDate = formatKoreaDate(date);
      const data = await getTimetable(formattedDate);
      setTimeTableSchedules(data);
    } catch (error) {
      console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      setTimeTableSchedules([]);
    }
  };

  const onAddSchedule = async (savedData) => {
    try {
      const newSchedule = await addSchedule(savedData);
      addScheduleCard(newSchedule);
      addDateToCalendar(newSchedule.scheduleDate);
    } catch (error) {
      console.error("일정을 추가하는 중 오류 발생:", error);
    }
  };

  const onDeleteSchedule = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId);

      setTimeTableSchedules((prevSchedules) => {
        const updatedSchedules = prevSchedules.filter(
          (schedule) => schedule.scheduleId !== scheduleId
        );

        if (updatedSchedules.length === 0) {
          setCalendarSchedules((prevCalendar) =>
            prevCalendar.filter(
              (date) => date !== formatKoreaDate(selectedDate)
            )
          );
        }

        return updatedSchedules;
      });

      alert("일정이 삭제되었습니다.");
    } catch (error) {
      console.error("일정을 삭제하는 중 오류 발생:", error);
    }
  };

  const addDateToCalendar = (date) => {
    setCalendarSchedules((prev) => {
      console.log("이전 캘린더 상태:", prev);
      console.log("추가할 날짜:", date);
      if (!prev.includes(date)) {
        const updatedCalendar = [...prev, date];
        console.log("업데이트된 캘린더 상태:", updatedCalendar);
        return updatedCalendar;
      }
      return prev;
    });
  };

  const addScheduleCard = (schedule) => {
    setTimeTableSchedules((prevSchedules) => [...prevSchedules, schedule]);
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

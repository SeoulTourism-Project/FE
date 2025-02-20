import React, { useState } from "react";
import styled from "styled-components";
import { formatKoreaDate } from "../../../utils/changeDateFormUtils";
import ScheduleCard from "./ScheduleCard";
import ScheduleAddModal from "./addModal/ScheduleAddModal";

const Timetable = ({ date, schedules, onDeleteSchedule, onAddSchedule }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    onDeleteSchedule(id);
  };

  return (
    <TimeTableContainer>
      <h2>{formatKoreaDate(date)}</h2>
      {schedules.length > 0
        ? schedules.map((schedule, index) => (
            <ScheduleContainer key={index}>
              <Figure>
                <Circle value={"black"} />
                <Line />
              </Figure>
              <ContentContainer>
                <ScheduleCard schedule={schedule} />
                <DeleteButton onClick={() => handleDelete(schedule.scheduleId)}>
                  X
                </DeleteButton>
              </ContentContainer>
            </ScheduleContainer>
          ))
        : null}
      <ScheduleAddContainer>
        <Circle value={"#f9f9f9"} id="addCircle" />
        <ScheduleAddButton onClick={handleOpenModal}>+ 추가</ScheduleAddButton>
      </ScheduleAddContainer>

      {isModalOpen && (
        <ScheduleAddModal
          onClose={handleCloseModal}
          selectedDate={date}
          onAddSchedule={onAddSchedule}
        >
          <p>여기에 모달 내용을 추가하세요!</p>
        </ScheduleAddModal>
      )}
    </TimeTableContainer>
  );
};

const TimeTableContainer = styled.div`
  width: 680px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 40px;
  }
`;

const ScheduleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 0 0 50px 20px;

  width: 90%;
  height: 180px;
`;

const Figure = styled.div`
  margin-right: 35px;
`;

const Circle = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-radius: 50%;
  background: ${(props) => props.value};
`;

const Line = styled.div`
  display: flex;
  margin-left: 12px;

  border-left: 1px solid black;
  height: 205px;
`;

const ScheduleAddContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const ScheduleAddButton = styled.button`
  width: 80px;
  height: 25px;
  margin-left: 35px;

  background: #f9f9f9;
  border: 1px solid black;
  border-radius: 25px;

  font-size: 1rem;

  &:hover {
    background: black;
    color: #f9f9f9;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  width: 25px;
  height: 25px;

  border: none;

  color: white;
  background: #eee;
  border-radius: 25%;
  cursor: pointer;
  font-size: 0.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e60000;
  }
`;

export default Timetable;

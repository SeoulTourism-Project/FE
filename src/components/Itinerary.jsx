import React from "react";
import Calendar from "./Calendar";
import Timetable from "./Timetable";
import styled from "styled-components";

const Itinerary = () => {
  return (
    <Container>
      <Calendar />
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

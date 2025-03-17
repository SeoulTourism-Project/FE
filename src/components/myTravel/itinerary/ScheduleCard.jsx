import React from "react";
import styled from "styled-components";

const ScheduleCard = ({ schedule }) => {
  return (
    <CardContainer>
      {schedule.startTime && schedule.endTime && (
        <ScheduleTime>
          {schedule.startTime} - {schedule.endTime}
        </ScheduleTime>
      )}
      <ScheduleItem>
        <ScheduleImage src={schedule.image} alt={schedule.name} />
        <ScheduleDetails>
          <ScheduleName>{schedule.name}</ScheduleName>
          <ScheduleAddress>{schedule.address}</ScheduleAddress>
          {schedule.memo && (
            <ScheduleMemo>
              <p>메모</p>
              {schedule.memo}
            </ScheduleMemo>
          )}
        </ScheduleDetails>
      </ScheduleItem>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 210px;
  margin-top: 2px;
`;

const ScheduleTime = styled.div`
  flex: 0 0 auto;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  max-width: 100%;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const ScheduleImage = styled.img`
  aspect-ratio: 1 / 1;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin-right: 18px;
  object-fit: cover;
`;

const ScheduleDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  margin-right: 20px;
  text-align: left;
`;

const ScheduleName = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ScheduleAddress = styled.p`
  color: gray;
  margin-bottom: 20px;
`;

const ScheduleMemo = styled.div`
  p {
    font-weight: bold;
    margin-bottom: 3px;
  }
`;

export default ScheduleCard;

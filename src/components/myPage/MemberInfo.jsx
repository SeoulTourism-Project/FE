import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faVenusMars,
  faGlobe,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const MemberInfo = () => {
  const userInfo = {
    user_id: 123,
    email: "hong@example.com",
    username: "홍길동",
    gender: "M",
    country: "대한민국",
    created_at: "2025-01-01T12:00:00",
  };

  const genderLabel = userInfo.gender === "M" ? "남성" : "여성";
  const formattedDate = userInfo.created_at.split("T")[0];

  const infoList = [
    { icon: faUser, label: "이름", value: userInfo.username },
    { icon: faEnvelope, label: "이메일", value: userInfo.email },
    { icon: faVenusMars, label: "성별", value: genderLabel },
    { icon: faGlobe, label: "국가", value: userInfo.country },
    { icon: faCalendarAlt, label: "가입일", value: formattedDate },
  ];

  return (
    <Card>
      {infoList.map((item, index) => (
        <InfoRow key={index}>
          <Icon>
            <FontAwesomeIcon icon={item.icon} />
          </Icon>
          <Label>{item.label}:</Label>
          <Value>{item.value}</Value>
        </InfoRow>
      ))}
    </Card>
  );
};

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto 0;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const Icon = styled.div`
  font-size: 1.5rem;
  color: #000;
  margin-right: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
  width: 80px;
`;

const Value = styled.span`
  flex: 1;
`;

export default MemberInfo;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faVenusMars,
  faGlobe,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { fetchMemberInfo } from "../../api/memberInfoAPI";

const MemberInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchMemberInfo();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;
  if (!userInfo) return <p>회원 정보를 불러올 수 없습니다.</p>;

  const genderLabel = userInfo.gender === "M" ? "남성" : "여성";

  const infoList = [
    { icon: faUser, label: "이름", value: userInfo.userName },
    { icon: faEnvelope, label: "이메일", value: userInfo.email },
    { icon: faVenusMars, label: "성별", value: genderLabel },
    { icon: faGlobe, label: "국가", value: userInfo.country },
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

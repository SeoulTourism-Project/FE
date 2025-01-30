import React, { useState } from "react";
import MemberInfo from "../components/myPage/MemberInfo";
import PaymentHistory from "../components/myPage/PaymentHistory";
import styled from "styled-components";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("memberInfo");

  return (
    <Container>
      <Title>개인 정보</Title>
      <Tabs>
        <TabButton
          active={activeTab === "memberInfo"}
          onClick={() => setActiveTab("memberInfo")}
        >
          회원 정보
        </TabButton>
        <p>|</p>
        <TabButton
          active={activeTab === "payHistory"}
          onClick={() => setActiveTab("payHistory")}
        >
          결제 내역
        </TabButton>
      </Tabs>
      <div>
        {activeTab === "memberInfo" && <MemberInfo />}
        {activeTab === "payHistory" && <PaymentHistory />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 1280px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  p {
    font-size: 2rem;
    margin: 0 40px;
  }
`;

const TabButton = styled.button`
  background: ${(props) => (props.active ? "gray" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-size: 1rem;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: ${(props) => (props.active ? "#555" : "#ddd")};
  }
`;

export default MyPage;

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router';

const SignupContainer = styled.div`
  max-width: 425px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:pink 
  div{(margin-top: 10px;)}
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
  display: block;
`;
const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px; /* 이름과 성 사이 간격 */
`;

const NameInput = styled.input`
  width: 100%; /* 원하는 너비로 설정 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  height: 35px;
  margin: 5px 0;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const LastNameInput = styled(NameInput)``; // 동일한 스타일 사용


const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 15px;
  height: 35px;


  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const RadioGroup = styled.div`
  margin: 15px 0;
  text-align: left;
  width: 100%;
`;

const RadioLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
`;

const SignupButton = styled.button`
  padding: 12px 20px;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  text-align: left;
`;
const LinkA = styled(Link) ``;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "이름을 입력해주세요.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "성을 입력해주세요.";
    }
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("회원가입 데이터:", formData);
      alert("회원가입 성공!");
    }
  };

  return (
    <SignupContainer>
      <Title>환영합니다</Title>
      <Form onSubmit={handleSubmit}>
        <NameContainer>
          <div>
            <Label htmlFor="firstName">이름</Label>
            <NameInput
              id="firstName"
              name="firstName"
              placeholder="이름"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </div>
          <div>
            <Label htmlFor="lastName">성</Label>
            <NameInput
              id="lastName"
              name="lastName"
              placeholder="성"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </div>
        </NameContainer>

        <div style={{ width: "100%" }}>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </div>

        <div style={{ width: "100%" }}>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </div>

        <div style={{ width: "100%" }}>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </div>

        <RadioGroup>
          <Label>성별</Label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="남"
              onChange={handleChange}
            />
            <RadioLabel htmlFor="male">남</RadioLabel>
            <input
              type="radio"
              id="female"
              name="gender"
              value="여"
              onChange={handleChange}
            />
            <RadioLabel htmlFor="female">여</RadioLabel>
          </div>
          {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
        </RadioGroup>

        <SignupButton type="submit">회원가입</SignupButton>
      </Form>
      <FooterText>
        이미 계정이 있으신가요? <LinkA to="/login">로그인</LinkA>
      </FooterText>
    </SignupContainer>
  );
};

export default Signup;

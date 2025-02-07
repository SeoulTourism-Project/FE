import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import { checkEmailAPI } from "../api/signupAPI";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    customCountry: "",
  });

  const [emailCheckStatus, setEmailCheckStatus] = useState(null);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!formData.country) {
      newErrors.country = "국적을 선택해주세요.";
    }
    if (formData.country === "직접 입력" && !formData.customCountry.trim()) {
      newErrors.customCountry = "국적을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleEmailCheck = async () => {
    const email = formData.email.trim().toLowerCase();
    if (!email) {
      setEmailCheckStatus("이메일을 입력해주세요.");
      return;
    }

    setEmailCheckLoading(true);
    try {
      const response = await checkEmailAPI(email);

      if (response.isSuccess && response.result.success) {
        setEmailCheckStatus("사용 가능한 이메일입니다.");
      } else {
        setEmailCheckStatus(
          response.result.message || "이미 사용 중인 이메일입니다."
        );
      }
    } catch (error) {
      setEmailCheckStatus("이메일 중복 확인에 실패했습니다.");
    } finally {
      setEmailCheckLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const finalCountry =
        formData.country === "직접 입력"
          ? formData.customCountry
          : formData.country;
      console.log("회원가입 데이터:", {
        ...formData,
        country: finalCountry,
      });
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
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
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

        <EmailContainer>
          <EmailRow>
            <div style={{ flex: 1 }}>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <CheckButton
              type="button"
              onClick={handleEmailCheck}
              disabled={emailCheckLoading}
            >
              {emailCheckLoading ? "확인 중..." : "중복 확인"}
            </CheckButton>
          </EmailRow>
          {(errors.email && <ErrorMessage>{errors.email}</ErrorMessage>) ||
            (emailCheckStatus && <EmailStatus>{emailCheckStatus}</EmailStatus>)}
        </EmailContainer>

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
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
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
            <RadioLabel htmlFor="male">남자</RadioLabel>
            <input
              type="radio"
              id="female"
              name="gender"
              value="여"
              onChange={handleChange}
            />
            <RadioLabel htmlFor="female">여자</RadioLabel>
          </div>
          {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
        </RadioGroup>

        <div style={{ width: "100%" }}>
          <Label htmlFor="country">국적</Label>
          <Select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">국적 선택</option>
            <option value="한국">한국</option>
            <option value="미국">미국</option>
            <option value="중국">중국</option>
            <option value="일본">일본</option>
            <option value="직접 입력">직접 입력</option>
          </Select>
          {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
        </div>

        {formData.country === "직접 입력" && (
          <div style={{ width: "100%" }}>
            <Label htmlFor="customCountry">국적 입력</Label>
            <Input
              id="customCountry"
              name="customCountry"
              type="text"
              placeholder="국적을 입력해주세요"
              value={formData.customCountry}
              onChange={handleChange}
            />
            {errors.customCountry && (
              <ErrorMessage>{errors.customCountry}</ErrorMessage>
            )}
          </div>
        )}

        <SignupButton type="submit">회원가입</SignupButton>
      </Form>
      <FooterText>
        이미 계정이 있으신가요? <LinkA to="/login">로그인</LinkA>
      </FooterText>
    </SignupContainer>
  );
};

/* Styled Components */
const SignupContainer = styled.div`
  max-width: 425px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 20px;

  div {
    margin-bottom: 20px;
  }
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
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
  display: block;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  text-align: left;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  div {
    margin-bottom: 0;
  }
`;

const NameInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px 0;
`;

const Input = styled(NameInput)``;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div {
    margin: 0;
  }
`;

const EmailRow = styled.div`
  display: flex;
  align-items: end;
  gap: 8px;
`;

const CheckButton = styled.button`
  height: 100%;
  padding: 10px 15px;
  margin: 5px 0;
  background-color: #aaa;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #000;
  }
`;

const EmailStatus = styled(ErrorMessage)`
  color: ${({ children }) =>
    children.includes("사용 가능") ? "green" : "red"};
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px 0;
`;

const RadioGroup = styled.div`
  text-align: left;
  width: 100%;

  div {
    margin: 5px 0;
  }
`;

const RadioLabel = styled.label`
  margin: 0 10px;
  font-size: 14px;
`;

const SignupButton = styled.button`
  padding: 12px 20px;
  background-color: black;
  color: white;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-top: 20px;
`;

const LinkA = styled(Link)``;

export default Signup;

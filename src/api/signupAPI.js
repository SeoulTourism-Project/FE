import { api } from "../utils/api";

export const checkEmailAPI = async (email) => {
  try {
    const response = await api.post("/auth/email", { email });
    console.log("checkEmail-response: ", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "이메일 중복 확인 실패");
  }
};

export const signupAPI = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "회원가입 실패");
  }
};

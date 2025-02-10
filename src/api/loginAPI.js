import { api } from "../utils/api";

export const loginAPI = async (email, password) => {
  try {
    const response = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    console.log("login-response: ", response.data);

    sessionStorage.setItem("accessToken", response.data.result.access);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "로그인 실패");
  }
};

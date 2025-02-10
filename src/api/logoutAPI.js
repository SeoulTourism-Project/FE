import { api } from "../utils/api";

export const logoutAPI = async () => {
  try {
    await api.post(
      "/logout",
      {},
      {
        withCredentials: true,
      }
    );

    sessionStorage.removeItem("accessToken");

    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw new Error(error.response?.data?.message || "로그아웃 실패");
  }
};

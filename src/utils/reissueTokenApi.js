import axios from "axios";
import { api } from "./api";

// ✅ access token 재발급 함수 (API 요청 실패 시 호출됨)
export const refreshAccessToken = async () => {
  try {
    console.log("🔄 Access token 없음 → 자동 재발급 시도");
    const response = await api.post(
      `/reissue`,
      {},
      {
        withCredentials: true,
      }
    );

    // 📌 API 응답에서 Access Token 추출
    let { Authorization } = response.data;

    if (!Authorization) {
      throw new Error("🚨 Access Token이 응답에 없음!");
    }

    // 🔧 "Bearer " 부분 제거
    Authorization = Authorization.replace("Bearer ", "");

    // 🔑 새로운 Access Token 저장
    sessionStorage.setItem("accessToken", Authorization);
    console.log("✅ Access Token이 sessionStorage에 저장됨:", Authorization);

    return Authorization;
  } catch (error) {
    console.error("🚨 Access token 재발급 실패 (로그인이 필요함)", error);
    // sessionStorage.removeItem("accessToken");
    // window.location.href = "/login"; // 로그인 페이지로 이동
    throw error;
  }
};

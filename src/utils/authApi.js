import axios from "axios";
import { refreshAccessToken } from "./reissueTokenApi"; // 재발급 로직 불러오기

const BASE_URL = "https://seoultourism.store/";

// 회원 API 요청용 Axios 인스턴스
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터: 모든 요청에 accessToken 자동 추가
authApi.interceptors.request.use(
  async (config) => {
    let accessToken = sessionStorage.getItem("accessToken");

    // 🚀 accessToken이 없으면 자동 재발급 시도
    if (!accessToken) {
      try {
        accessToken = await refreshAccessToken();
      } catch (error) {
        return Promise.reject(error);
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: accessToken 만료 시 자동 재발급
authApi.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("🚨 Access token 만료됨 → 재발급 시도");
      try {
        const newAccessToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi.request(error.config);
      } catch (reissueError) {
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

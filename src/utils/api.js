import axios from "axios";

const BASE_URL = "https://seoultourism.store/";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

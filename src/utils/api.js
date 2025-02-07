import axios from "axios";

const BASE_URL =
  "http://ec2-3-36-66-32.ap-northeast-2.compute.amazonaws.com:8080";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

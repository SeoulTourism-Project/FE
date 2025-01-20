// 한국 시간대에 맞춘 날짜 변경 함수들

// UTC+9 날짜 변환 함수
export const convertToKoreaDate = (date) => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};

// YYYY-MM-DD 형식으로 변환 함수
export const formatDate = (date) => {
  return convertToKoreaDate(date).toISOString().split("T")[0];
};

// 시간 포맷팅 함수
export const formatTime24 = (isoString) => {
  return new Date(isoString).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24시간 형식
  });
};

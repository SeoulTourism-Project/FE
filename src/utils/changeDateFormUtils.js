// 한국 시간대(UTC+9)로 변환된 Date 객체 반환
export const convertToKoreaDate = (date) => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};

// 한국 시간대(UTC+9)의 날짜를 YYYY-MM-DD 형식으로 반환
export const formatKoreaDate = (date) => {
  return convertToKoreaDate(date).toISOString().split("T")[0];
};

// ISO 문자열을 24시간 시간 포맷(HH:mm)으로 변환
export const formatTime24 = (isoString) => {
  return new Date(isoString).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// 날짜(YYYY-MM-DD)와 시간(HH:mm)을 UTC Date 객체로 변환
export const combineToUTC = (date, time) => {
  return new Date(`${date}T${time}:00Z`);
};

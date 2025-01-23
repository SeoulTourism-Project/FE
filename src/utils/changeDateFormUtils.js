// 한국 시간대에 맞춘 날짜 변경 함수들

// UTC+9 날짜 변환 함수
export const convertToKoreaDate = (date) => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};

export const convertKoreaToUTCDate = (date) => {
  return new Date(date.getTime() - 9 * 60 * 60 * 1000);
};

// YYYY-MM-DD 형식으로 변환 함수
export const formatDate = (date) => {
  return convertKoreaToUTCDate(date).toISOString().split("T")[0];
};

export const formatKoreaDate = (date) => {
  return convertToKoreaDate(date).toISOString().split("T")[0];
};

// 시간 포맷팅 함수
export const formatKoreaTime24 = (isoString) => {
  return new Date(isoString).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24시간 형식
  });
};

export const formatTodayKoreaTime = () => {
  return getKoreaTime().toISOString();
};

export const getKoreaTime = () => {
  const now = new Date(); // 현재 UTC 기준 시간
  return new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9로 변환
};

export const formatUTCDate = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[date.getUTCDay()]; // Day of the week
  const month = months[date.getUTCMonth()]; // Month
  const dayOfMonth = date.getUTCDate(); // Day of the month
  const year = date.getUTCFullYear(); // Year

  return `${day} ${month} ${dayOfMonth} ${year}`;
};

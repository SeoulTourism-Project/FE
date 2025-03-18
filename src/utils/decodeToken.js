export const getAccessToken = () => sessionStorage.getItem("accessToken");

const decodeToken = (token) => {
  if (!token) return null;

  try {
    const payload = token.split(".")[1]; // JWT의 두 번째 부분 (Payload)
    const decodedPayload = decodeURIComponent(escape(atob(payload))); // Base64 디코딩 및 한글 깨짐 방지
    return JSON.parse(decodedPayload); // JSON 변환
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    return null;
  }
};

export const getUserIdFromToken = () =>
  decodeToken(getAccessToken())?.userId ?? null;
export const getUserNameFromToken = () =>
  decodeToken(getAccessToken())?.username ?? null;

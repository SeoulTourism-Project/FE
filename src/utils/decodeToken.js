export const decodeToken = (token) => {
  try {
    if (!token) return null;

    const payload = token.split(".")[1]; // JWT의 두 번째 부분 (Payload)
    const decodedPayload = decodeURIComponent(escape(atob(payload))); // Base64 디코딩 및 한글 깨짐 방지

    return JSON.parse(decodedPayload); // JSON 변환
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    return null;
  }
};

export const getUserNameFromToken = () => {
  const token = sessionStorage.getItem("accessToken");
  const decoded = decodeToken(token);

  return decoded ? decoded.username : null;
};

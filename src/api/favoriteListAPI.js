import { api } from "../utils/api";
import { getUserIdFromToken, getAccessToken } from "../utils/decodeToken"; // 토큰 관련 함수

export const fetchFavoriteList = async () => {
  const userId = getUserIdFromToken(); // userId 가져오기
  const accessToken = getAccessToken(); // accessToken 가져오기

  if (!userId || !accessToken) {
    throw new Error("인증 정보가 없습니다. 로그인 후 다시 시도해주세요.");
  }

  try {
    const response = await api.get(`/fav-places/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });

    // API 응답 데이터를 tourAttractionItem 구조에 맞게 변환
    return response.data.map((item) => ({
      id: item.mapId,
      name: item.placeName,
      address: item.placeLocation,
      image: item.placeImage,
      likeStatus: item.likeStatus,
    }));
  } catch (error) {
    throw new Error("데이터를 불러오는 중 문제가 발생했습니다.");
  }
};

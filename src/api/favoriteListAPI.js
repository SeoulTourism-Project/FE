import { authApi } from "../utils/authApi";
import { getUserIdFromToken, getAccessToken } from "../utils/decodeToken";

export const fetchFavoriteList = async () => {
  const userId = getUserIdFromToken();
  const accessToken = getAccessToken();

  if (!userId || !accessToken) {
    throw new Error("인증 정보가 없습니다. 로그인 후 다시 시도해주세요.");
  }

  try {
    const response = await authApi.get(`/fav-places/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.map((item) => ({
      id: item.mapId,
      favPlaceId: item.favPlaceId,
      name: item.placeName,
      address: item.placeLocation,
      image: item.placeImage,
      likeStatus: item.likeStatus,
    }));
  } catch (error) {
    throw new Error("데이터를 불러오는 중 문제가 발생했습니다.");
  }
};

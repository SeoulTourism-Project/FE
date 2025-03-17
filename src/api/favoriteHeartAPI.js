import { api } from "../utils/api";
import { getUserIdFromToken, getAccessToken } from "../utils/decodeToken";

const getAuthHeaders = () => {
  const userId = getUserIdFromToken();
  const accessToken = getAccessToken();

  if (!userId || !accessToken) {
    throw new Error("인증 정보가 없습니다. 로그인 후 다시 시도해주세요.");
  }

  return { userId, headers: { Authorization: `Bearer ${accessToken}` } };
};

/** 📌 찜 추가 */
export const addFavorite = async (mapId) => {
  const { userId, headers } = getAuthHeaders();

  try {
    const response = await api.post(
      `/fav-places/${mapId}/like?userId=${userId}`,
      {},
      { headers }
    );

    console.log("찜 추가 성공:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("찜을 추가하는 중 오류가 발생했습니다.");
  }
};

/** 📌 찜 해제 */
export const removeFavorite = async (mapId) => {
  const { userId, headers } = getAuthHeaders();

  try {
    const response = await api.delete(
      `/fav-places/${mapId}/unlike?userId=${userId}`,
      { headers }
    );

    console.log("찜 해제 성공:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("찜을 해제하는 중 오류가 발생했습니다.");
  }
};

/** 📌 찜 토글 (추가/해제) */
export const toggleFavorite = async (mapId) => {
  const { headers } = getAuthHeaders();

  try {
    const response = await api.post(`/api/maps/${mapId}/new`, {}, { headers });

    console.log("찜 토글 결과: ", response.data);
    return response.data; // true or false
  } catch (error) {
    throw new Error("찜 상태 변경 중 오류가 발생했습니다.");
  }
};

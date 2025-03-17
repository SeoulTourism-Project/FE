import { authApi } from "../utils/authApi";
import { getAccessToken, getUserIdFromToken } from "../utils/decodeToken";

export const addItemToCart = async (goodId, quantity) => {
  const accessToken = getAccessToken();
  const userId = getUserIdFromToken();

  const addItem = {
    userId,
    goodId,
    quantity,
  };

  try {
    const response = await authApi.post("/cart/add", addItem, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("카트에 성공적으로 추가하였습니다. : ", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "🚨카트에 추가하기를 실패하였습니다."
    );
  }
};

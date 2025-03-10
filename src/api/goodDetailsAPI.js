import { api } from "../utils/api";

export const fetchGoodDetails = async (goodId) => {
  try {
    const response = await api.get(`/api/goods/${goodId}`);
    const data = response.data;

    return {
      id: data.goodId,
      name: data.goodName,
      category: data.categoryName,
      imageUrl: data.goodImage,
      price: data.goodPrice,
      stock: data.goodStock,
      description: data.goodDescription,
    };
  } catch (error) {
    console.error("굿즈 상세 조회 오류:", error);
    throw error;
  }
};

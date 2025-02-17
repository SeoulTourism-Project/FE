import { api } from "../utils/api";

export const fetchGoods = async (page = 0, size = 12) => {
  console.log("page: ", page, "size: ", size);
  try {
    const response = await api.get(`/api/goods?page=${page}&size=${size}`);
    const result = response.data;
    console.log(result);

    return {
      goods: result.content.map((item) => ({
        id: item.goodsId,
        imgUrl: item.goodsImage,
        title: item.goodsName,
        price: item.goodsPrice,
      })),
      totalPages: result.page.totalPages,
      currentPage: result.page.number,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "상품 데이터를 불러오는 데 실패했습니다."
    );
  }
};

export const fetchCategoryGoods = async (page = 0, size = 12, category) => {
  try {
    const response = await api.get(
      `/api/goods/category/${category}?page=${page}`
    );
    const result = response.data;
    console.log(result);

    return {
      goods: result.content.map((item) => ({
        id: item.goodsId,
        imgUrl: item.goodsImage,
        title: item.goodsName,
        price: item.goodsPrice,
      })),
      totalPages: result.page.totalPages,
      currentPage: result.page.number,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "상품 데이터를 불러오는 데 실패했습니다."
    );
  }
};

import { authApi } from "../utils/authApi";
import { getAccessToken } from "../utils/decodeToken";

export const fetchPaymentHistory = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await authApi.get("/payment/history", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("결제 내역: ", response.data);

    return {
      paymentId: response.data.paymentId,
      date: response.data.purchaseDate,
      buyer: response.data.userName,
      phone: response.data.phone,
      address: response.data.address,
      summary: response.data.itemSummary,
      products: {
        // productId,
        image: response.data.orderItems.itemImage,
        name: response.data.orderItems.itemName,
        quantity: response.data.orderItems.quantity,
        price: response.data.orderItems.quantity,
        // shipping, // 배송 상태
      }, // 상품 정보
      totalAmount: response.data.totalAmount,
      //   shippingFee,
      finalAmount: response.data.paymentAmount,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn("결제 데이터가 없습니다.");
      return [];
    }
    throw new Error(
      error.response?.data?.message ||
        "결제 내역 데이터를 불러오는 데 실패했습니다."
    );
  }
};

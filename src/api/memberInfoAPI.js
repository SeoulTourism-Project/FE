import { authApi } from "../utils/authApi";
import { getAccessToken } from "../utils/decodeToken";

export const fetchMemberInfo = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await authApi.get("/auth/myinfo", {
      Authorization: `Bearer ${accessToken}`,
    });

    return response.data.result;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "회원 정보 데이터를 불러오는 데 실패했습니다."
    );
  }
};

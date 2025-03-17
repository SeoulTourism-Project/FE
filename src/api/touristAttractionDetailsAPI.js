import { api } from "../utils/api";
import { getAccessToken } from "../utils/decodeToken";

const getAuthHeaders = () => {
  const accessToken = getAccessToken();

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : null;

  return headers;
};

export const fetchTouristAttractionById = async (mapId) => {
  const headers = getAuthHeaders();
  console.log("headers: ", headers);

  try {
    const response = await api.get(`/api/maps/${mapId}`, { headers });
    const data = response.data;
    console.log("여행지 상세 페이지 정보: ", data);

    return {
      mapId: data.map_id,
      name: data.place_name,
      image: data.place_image,
      info: data.place_details_info,
      address: data.place_location,
      lat: data.lat,
      lng: data.lng,
      favorite: data.favorite,
      closeDate: data.close_date,
      operationTime: data.operation_time,
      contactNum: data.place_contact_num,
    };
  } catch (error) {
    throw new Error(
      `Error fetching tourist attraction details: ${error.message}`
    );
  }
};

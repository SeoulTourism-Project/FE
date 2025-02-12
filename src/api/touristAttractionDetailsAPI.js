import { api } from "../utils/api";

export const fetchTouristAttractionById = async (mapId) => {
  try {
    const response = await api.get(`/api/maps/${mapId}`);
    const data = response.data;

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

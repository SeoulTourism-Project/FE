import { api } from "../utils/api";

export const fetchTouristAttractions = async (page = 0, size = 12) => {
  try {
    const response = await api.get(`/api/maps?page=${page}&size=${size}`);

    return {
      maps: response.data.maps.map((item) => ({
        id: item.map_id,
        name: item.place_name,
        image: item.place_image,
        address: item.place_location,
      })),
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
    };
  } catch (error) {
    throw new Error(`Error fetching tourist attractions: ${error.message}`);
  }
};

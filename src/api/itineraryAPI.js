import { api } from "../utils/api";
import { getUserIdFromToken, getAccessToken } from "../utils/decodeToken";
import {
  formatKoreaDate,
  formatTime24,
  combineToUTC,
} from "../utils/changeDateFormUtils";

const getAuthHeaders = () => {
  const userId = getUserIdFromToken();
  const accessToken = getAccessToken();

  if (!userId || !accessToken) {
    throw new Error("인증 정보가 없습니다. 로그인 후 다시 시도해주세요.");
  }

  return { userId, headers: { Authorization: `Bearer ${accessToken}` } };
};

/** 📌 캘린더 일정 조회 (마크된 날짜) */
export const getMarkedDates = async () => {
  const { userId, headers } = getAuthHeaders();

  try {
    const response = await api.get(`/calendar/dates/${userId}`, { headers });
    console.log("calendar: ", response.data);
    return response.data || [];
  } catch (error) {
    throw new Error("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

/** 📌 특정 날짜의 타임테이블 일정 조회 */
export const getTimetable = async (tourStartDate) => {
  const { userId, headers } = getAuthHeaders();

  console.log("tourStartDate: ", tourStartDate);
  try {
    const response = await api.get(
      `/calendar/schedule/${userId}?tourStartDate=${tourStartDate}`,
      { headers }
    );

    console.log("schedule: ", response.data);

    return (response.data || []).map((schedule) => ({
      scheduleId: schedule.calendarDetailsId,
      mapId: schedule.mapId,
      name: schedule.favPlaceName,
      address: schedule.favPlaceLocation,
      startTime: formatTime24(schedule.scheduleTime),
      endTime: formatTime24(schedule.scheduleEndTime),
      image: schedule.favPlaceImage,
      memo: schedule.memo,
    }));
  } catch (error) {
    throw new Error("타임테이블 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

/** 📌 일정 추가 */
export const addSchedule = async (savedData) => {
  const { userId, headers } = getAuthHeaders();

  const formattedDate = formatKoreaDate(savedData.selectedDate);

  const scheduleData = {
    mapId: savedData.selectedPlace.id,
    tourStartDate: formattedDate,
    scheduleTime: combineToUTC(formattedDate, savedData.startTime),
    scheduleEndTime: combineToUTC(formattedDate, savedData.endTime),
    memo: savedData.memo,
  };
  console.log("Add scheduleData: ", scheduleData);

  try {
    const response = await api.post(
      `/calendar/schedule/${userId}`,
      scheduleData,
      { headers }
    );

    const resData = response.data;
    console.log("Add Response", resData);
    return {
      scheduleId: resData.calendarDetailsId,
      mapId: savedData.mapId,
      name: savedData.selectedPlace.name,
      address: savedData.selectedPlace.address,
      startTime: formatTime24(scheduleData.scheduleTime),
      endTime: formatTime24(scheduleData.scheduleEndTime),
      image: savedData.selectedPlace.image,
      memo: resData.memo,
    };
  } catch (error) {
    throw new Error("일정을 추가하는 중 오류가 발생했습니다.");
  }
};

/** 📌 일정 삭제 */
export const deleteSchedule = async (calendarId) => {
  const { userId, headers } = getAuthHeaders();

  try {
    await api.delete(`/calendar/schedule/${calendarId}/${userId}`, { headers });
  } catch (error) {
    throw new Error("일정을 삭제하는 중 오류가 발생했습니다.");
  }
};

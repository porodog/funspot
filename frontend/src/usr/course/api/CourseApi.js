import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const searchPlaces = async (address = "") => {
  // 주소로 장소 검색
  const response = await axios.get(`${API_BASE_URL}/api/usr/place/all`, {
    params: { address },
  });
  return response.data;
};

export const registerDateCourse = async (course) => {
  // 데이트 코스 등록
  const response = await axios.post(`${API_BASE_URL}/api/usr/datecourses/`, course);
  return response.data;
};

export const getCourseList = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/usr/datecourses`);
  return response.data;
};

export const getCustomDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/usr/datecourses/${id}`);
  return response.data;
};

export const updateCustom = async (id, courseObj) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/usr/course/${id}`,
    courseObj
  );
  return response.data;
};

export const deleteCustom = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/usr/course/${id}`);
  return response.data;
};

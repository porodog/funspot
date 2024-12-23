import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정

export const postLoginApi = async (param) => {
  try {
    const res = await axios.post(`/api/usr/login/login`, param, {
      headers: { "Content-Type": "application/json" },
    });
    return { status: res.status, data: res.data };
  } catch (err) {
    return { status: err.response?.status || 500, data: err.response?.data };
  }
};

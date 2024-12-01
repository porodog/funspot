import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const getFeedListApi = async (param) => {
  const accessToken = localStorage.getItem("access_token") || "";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: param
  };

  const res = await axios.get(`${API_BASE_URL}/api/usr/feed`, config);
  return res.data;
};

export const getFeedDetailApi = async (idx) => {
  const accessToken = localStorage.getItem("access_token") || "";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  };
  const res = await axios.get(`${API_BASE_URL}/api/usr/feed/${idx}`, config);
  return res.data;
};

export const postFeedInsertApi = async (form) => {
  const header = { header: { "Content-Type": "multipart/form-data" } };
  return await axios.post(`${API_BASE_URL}/api/usr/feed`, form, header);
};

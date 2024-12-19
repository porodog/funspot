import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

export const postSignupApi = async (param) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/usr/signup/signup`,
      param,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { status: res.status, data: res.data };
  } catch (err) {
    console.error("API error:", err);
    const status = err.response ? err.response.status : 500;
    return { status, data: err.response ? err.response.data : "Unknown error" };
  }
};

export const checkDuplicateApi = (data) => {
  return axios.post(`${API_BASE_URL}/api/usr/signup/check-duplicate`, data);
};

export const sendEmailVerificationApi = (data) => {
  return axios.post(`${API_BASE_URL}/api/usr/email/send-verification`, data);
};

export const postSocialSignupApi = async (param) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/usr/signup/social-signup`,
      param,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { status: res.status, data: res.data };
  } catch (err) {
    console.error("API error:", err);
    const status = err.response?.status || 500; // Optional chaining 사용
    const message =
      err.response?.data?.message || "서버에서 알 수 없는 에러가 발생했습니다.";
    return { status, data: { message } }; // 항상 일관된 객체 구조로 반환
  }
};

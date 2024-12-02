import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_ROOT;

// 로그아웃 API
export const postLogoutApi = async () => {
  try {
    const config = {
      withCredentials: true, // 쿠키 포함
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/usr/logout/logout`,
      {},
      config
    );

    // 로그아웃 성공 상태 반환
    return { status: response.status };
  } catch (err) {
    console.error("로그아웃 요청 실패:", err);

    // 에러 상태 반환
    return {
      status: err.response?.status || 500,
    };
  }
};
